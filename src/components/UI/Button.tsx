import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useApp} from '../../app/state/AppContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}) => {
  const {theme} = useApp();

  const buttonStyles: ViewStyle[] = [
    styles.button,
    {
      backgroundColor:
        variant === 'primary'
          ? theme.colors.primary
          : variant === 'secondary'
          ? theme.colors.card
          : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: theme.colors.border,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    {
      color:
        variant === 'primary'
          ? '#FFFFFF'
          : variant === 'secondary'
          ? theme.colors.text
          : theme.colors.primary,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
