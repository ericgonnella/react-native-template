import React, {ReactNode} from 'react';
import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {useApp} from '../../app/state/AppContext';

interface SafeAreaProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const SafeArea: React.FC<SafeAreaProps> = ({children, style}) => {
  const {theme} = useApp();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
