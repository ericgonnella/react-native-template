import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useApp} from '../../app/state/AppContext';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({message}) => {
  const {theme} = useApp();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, {color: theme.colors.textSecondary}]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
});
