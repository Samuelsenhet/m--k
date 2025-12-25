import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PersonalityTest, PersonalityTestResult } from '../components/personality/PersonalityTest';

export const PersonalityTestScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const handleComplete = (result: PersonalityTestResult) => {
    // For now, navigate to a simple results screen or log
    console.log('Personality result:', result);
    if (navigation?.navigate) {
      navigation.navigate('PersonalityResult', { result });
    }
  };

  return (
    <View style={styles.container}>
      <PersonalityTest onComplete={handleComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', paddingTop: 32 },
});

export default PersonalityTestScreen;
