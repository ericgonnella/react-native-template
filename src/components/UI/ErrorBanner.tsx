import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useApp} from '../../app/state/AppContext';
import {Button} from './Button';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({message, onRetry}) => {
  const {theme} = useApp();

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.error}]}>
      <Text style={[styles.message, {color: '#FFFFFF'}]}>{message}</Text>
      {onRetry && (
        <Button
          title="Retry"
          onPress={onRetry}
          variant="outline"
          style={[styles.button, {borderColor: '#FFFFFF'}]}
          textStyle={{color: '#FFFFFF'}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  message: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    marginTop: 8,
  },
});
