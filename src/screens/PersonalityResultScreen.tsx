import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import type { RouteProp } from '@react-navigation/native';

type DimensionKey = 'ei' | 'sn' | 'tf' | 'jp' | 'at';

export type PersonalityTestResult = {
  scores: Record<DimensionKey, number>;
  category: 'DIPLOMAT' | 'STRATEGER' | 'BYGGARE' | 'UPPTÄCKARE';
  archetype: string;
  answers: number[];
};

export const PersonalityResultScreen: React.FC<{
  route: RouteProp<Record<string, object | undefined>, string> & { params?: { result?: PersonalityTestResult } };
}> = ({ route }) => {
  const result = route.params?.result;
  const [icebreakers, setIcebreakers] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchIcebreakers = async () => {
    if (!result) return;
    setLoading(true);
    try {
      // prefer local SDK client
      const { generateIcebreakers } = await import('../services/claude/claudeClient');
      const items = await generateIcebreakers({ profileText: `Personlighet: ${result.category}. Scores: ${JSON.stringify(result.scores)}`, count: 3 });
      setIcebreakers(items.map(i => i.text));
    } catch (e) {
      setIcebreakers([`Kunde inte hämta isbrytare: ${String(e)}`]);
    } finally {
      setLoading(false);
    }
  };

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inga resultat</Text>
        <Text style={styles.text}>Inga personlighetstestresultat skickades till denna vy.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ditt resultat</Text>
      <Text style={styles.subtitle}>Kategori: {result.category}</Text>
      <Text style={styles.archetype}>Arketyp: {result.archetype}</Text>

      <View style={styles.scoresCard}>
        {Object.entries(result.scores).map(([k, v]) => (
          <View key={k} style={styles.scoreRow}>
            <Text style={styles.scoreKey}>{k.toUpperCase()}</Text>
            <Text style={styles.scoreValue}>{v}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Snabb tips</Text>
        <Text style={styles.text}>- Fokusera på att visa empati och ställa öppna frågor.</Text>
        <Text style={styles.text}>- Använd AI-övningar för att få isbrytare skräddarsydda för din match.</Text>
        <Pressable onPress={fetchIcebreakers} style={styles.icebreakerButton}>
          <Text style={styles.icebreakerButtonText}>Generera isbrytare</Text>
        </Pressable>
        {loading && <ActivityIndicator />}
        {icebreakers && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.sectionTitle}>Isbrytare</Text>
            {icebreakers.map((t, i) => (
              <Text key={i} style={styles.text}>- {t}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F9FAFB', minHeight: '100%' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6B7280', marginBottom: 4 },
  archetype: { fontSize: 14, color: '#374151', marginBottom: 12 },
  scoresCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  scoreKey: { fontWeight: '600', color: '#111827' },
  scoreValue: { fontWeight: '700', color: '#111827' },
  section: { marginTop: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  text: { color: '#374151', marginBottom: 4 },
  icebreakerButton: { marginTop: 8, backgroundColor: '#6366F1', padding: 10, borderRadius: 8, alignItems: 'center' },
  icebreakerButtonText: { color: '#fff', fontWeight: '700' },
});

export default PersonalityResultScreen;
