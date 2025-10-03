import React from 'react';
import {StatusBar, View, Platform} from 'react-native';
import {AppProvider, useApp} from './state/AppContext';
import {Navigation} from './navigation';

// Conditionally import GestureHandlerRootView only on native
let GestureHandlerRootView: React.ComponentType<any> = View;
if (Platform.OS !== 'web') {
  const GestureHandler = require('react-native-gesture-handler');
  GestureHandlerRootView = GestureHandler.GestureHandlerRootView;
}

const AppContent: React.FC = () => {
  const {theme} = useApp();

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Navigation />
    </>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </GestureHandlerRootView>
  );
};

export default App;
