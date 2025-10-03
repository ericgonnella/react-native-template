import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle, Platform} from 'react-native';
import {useApp} from '../../app/state/AppContext';

interface ContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({children, style}) => {
  const {theme} = useApp();

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'web' && styles.webContainer,
        {backgroundColor: theme.colors.background},
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  webContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
});
