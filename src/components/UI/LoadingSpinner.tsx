import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {useApp} from '../../app/state/AppContext';

export const LoadingSpinner: React.FC = () => {
  const {theme} = useApp();

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
