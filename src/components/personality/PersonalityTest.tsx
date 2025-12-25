import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

type DimensionKey = 'ei' | 'sn' | 'tf' | 'jp' | 'at';

export type PersonalityTestResult = {
  scores: Record<DimensionKey, number>; // 0-100
  category: 'DIPLOMAT' | 'STRATEGER' | 'BYGGARE' | 'UPPTÄCKARE';
  archetype: string;
  answers: number[];
};

// 30 placeholder questions mapped evenly across 5 dimensions (6 each)
const QUESTIONS: { id: number; text: string }[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  text: `Fråga ${i + 1}: Välj hur väl detta stämmer för dig (1-5).`,
}));

const DIMENSION_ORDER: DimensionKey[] = ['ei', 'sn', 'tf', 'jp', 'at'];

export const PersonalityTest: React.FC<{
  onComplete?: (result: PersonalityTestResult) => void;
}> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(0));

  const setAnswer = (qIndex: number, value: number) => {
    const copy = [...answers];
    copy[qIndex] = value;
    setAnswers(copy);
  };

  const completed = answers.every(a => a >= 1 && a <= 5);

  const computeResult = (): PersonalityTestResult => {
    // Aggregate per-dimension (6 questions each)
    const scores: Record<DimensionKey, number> = {
      ei: 0,
      sn: 0,
      tf: 0,
      jp: 0,
      at: 0,
    };

    for (let i = 0; i < QUESTIONS.length; i++) {
      const dim = DIMENSION_ORDER[Math.floor(i / 6)];
      scores[dim] += answers[i];
    }

    // Convert 1-5 average to 0-100
    (Object.keys(scores) as DimensionKey[]).forEach(k => {
      const avg = scores[k] / 6; // 1-5
      scores[k] = Math.round(((avg - 1) / 4) * 100); // map 1..5 -> 0..100
    });

    const category = determineCategory(scores);

    return {
      scores,
      category,
      archetype: 'Standard',
      answers,
    };
  };

  const determineCategory = (scores: Record<DimensionKey, number>) => {
    // Simple heuristic: use highest-scoring dimension to pick a category.
    const order = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const top = order[0][0];

    switch (top) {
      case 'sn':
        return 'UPPTÄCKARE';
      case 'ei':
        return 'DIPLOMAT';
      case 'tf':
        return 'STRATEGER';
      case 'jp':
        return 'BYGGARE';
      case 'at':
        return scores.at > 55 ? 'STRATEGER' : 'DIPLOMAT';
      default:
        return 'DIPLOMAT';
    }
  };

  const handleSubmit = async () => {
    if (!completed) {
      Alert.alert('Avsluta testet', 'Vänligen besvara alla frågor innan du går vidare.');
      return;
    }

    const result = computeResult();

    // Attempt to save via Supabase helper if available (dynamic import to avoid bundling issues)
    try {
      const { upsertPersonalityScore, getCurrentUser } = await import('../../services/supabase/supabaseClient');
      const user = (await (getCurrentUser ? getCurrentUser() : Promise.resolve(null)))?.id ?? null;
      if (typeof upsertPersonalityScore === 'function') {
        await upsertPersonalityScore({
          user_id: user,
          category: result.category,
          archetype: result.archetype,
          ei_score: result.scores.ei,
          sn_score: result.scores.sn,
          tf_score: result.scores.tf,
          jp_score: result.scores.jp,
          at_score: result.scores.at,
          analysis_text: null,
        });
      }
    } catch (e) {
      // ignore if supabase not configured or dynamic import fails
    }

    onComplete?.(result);
  };

  const renderLikert = (qIndex: number) => (
    <View style={styles.likertRow}>
      {Array.from({ length: 5 }).map((_, i) => {
        const val = i + 1;
        const selected = answers[qIndex] === val;
        return (
          <Pressable
            key={val}
            onPress={() => setAnswer(qIndex, val)}
            style={[styles.likertButton, selected && styles.likertSelected]}
            android_ripple={{ color: '#EEE' }}
          >
            <Text style={[styles.likertText, selected && styles.likertTextSelected]}>{val}</Text>
          </Pressable>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Personlighetstest</Text>
      <Text style={styles.progress}>{index + 1}/{QUESTIONS.length}</Text>

      <View style={styles.card}>
        <Text style={styles.question}>{QUESTIONS[index].text}</Text>
        {renderLikert(index)}
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={() => setIndex(i => Math.max(0, i - 1))}
          style={styles.navButton}
        >
          <Text style={styles.navText}>Föregående</Text>
        </Pressable>

        {index < QUESTIONS.length - 1 ? (
          <Pressable onPress={() => setIndex(i => Math.min(QUESTIONS.length - 1, i + 1))} style={styles.navButton}>
            <Text style={styles.navText}>Nästa</Text>
          </Pressable>
        ) : (
          <Pressable onPress={handleSubmit} style={[styles.navButton, completed ? styles.submitButton : styles.navButtonDisabled]}>
            <Text style={[styles.navText, completed && styles.submitText]}>Avsluta</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  progress: { color: '#6B7280', marginBottom: 12 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12 },
  question: { fontSize: 16, marginBottom: 12 },
  likertRow: { flexDirection: 'row', justifyContent: 'space-between' },
  likertButton: { padding: 12, borderRadius: 8, backgroundColor: '#F3F4F6', minWidth: 44, alignItems: 'center' },
  likertSelected: { backgroundColor: '#9333EA' },
  likertText: { color: '#111827', fontWeight: '600' },
  likertTextSelected: { color: '#fff' },
  controls: { flexDirection: 'row', justifyContent: 'space-between' },
  navButton: { padding: 12 },
  navText: { color: '#374151', fontWeight: '600' },
  submitButton: { backgroundColor: '#10B981', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
  submitText: { color: '#fff' },
  navButtonDisabled: { opacity: 0.5 },
});

export default PersonalityTest;
