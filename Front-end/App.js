import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/main-navigator';
import { navigationRef } from './src/navigation/refglobal-navigation'; 

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainNavigator />
    </NavigationContainer>
  );
}
