import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {useApp} from '../state/AppContext';
import {SafeArea} from '../../components/layout/SafeArea';
import {Container} from '../../components/layout/Container';
import {Button} from '../../components/UI/Button';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {theme} = useApp();

  return (
    <SafeArea>
      <ScrollView>
        <Container>
          <View style={styles.header}>
            <Text style={[styles.title, {color: theme.colors.text}]}>
              Welcome to RN Web App
            </Text>
            <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>
              A bare React Native app running on iOS, Android, and Web
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Navigation</Text>
            <Button
              title="View About"
              onPress={() => navigation.navigate('About')}
              style={styles.button}
            />
            <Button
              title="View Examples"
              onPress={() => navigation.navigate('List')}
              style={styles.button}
            />
            <Button
              title="Settings"
              onPress={() => navigation.navigate('Settings')}
              variant="secondary"
              style={styles.button}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Features</Text>
            <View style={styles.featureList}>
              <Text style={[styles.feature, {color: theme.colors.textSecondary}]}>
                ✓ Cross-platform (iOS, Android, Web)
              </Text>
              <Text style={[styles.feature, {color: theme.colors.textSecondary}]}>
                ✓ TypeScript strict mode
              </Text>
              <Text style={[styles.feature, {color: theme.colors.textSecondary}]}>
                ✓ Light/Dark theme with persistence
              </Text>
              <Text style={[styles.feature, {color: theme.colors.textSecondary}]}>
                ✓ React Navigation for all platforms
              </Text>
              <Text style={[styles.feature, {color: theme.colors.textSecondary}]}>
                ✓ Mock data with loading states
              </Text>
            </View>
          </View>
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 32,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  button: {
    marginBottom: 12,
  },
  featureList: {
    gap: 8,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HomeScreen;
