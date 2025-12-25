import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalityTestScreen from '../screens/PersonalityTestScreen';
import PersonalityResultScreen from '../screens/PersonalityResultScreen';
import McpDemoScreen from '../screens/McpDemoScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PersonalityTest" component={PersonalityTestScreen} options={{ title: 'Personlighetstest' }} />
        <Stack.Screen
          name="PersonalityResult"
          component={PersonalityResultScreen}
          options={{ title: 'Resultat' }}
        />
        <Stack.Screen name="McpDemo" component={McpDemoScreen} options={{ title: 'MCP Demo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
