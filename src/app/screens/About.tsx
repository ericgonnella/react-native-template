import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useApp} from '../state/AppContext';
import {SafeArea} from '../../components/layout/SafeArea';
import {Container} from '../../components/layout/Container';
import {Card} from '../../components/UI/Card';
import env from '../../lib/env';
import {Platform} from 'react-native';

const AboutScreen: React.FC = () => {
  const {theme} = useApp();

  return (
    <SafeArea>
      <ScrollView>
        <Container>
          <View style={styles.section}>
            <Text style={[styles.title, {color: theme.colors.text}]}>About This App</Text>
            <Text style={[styles.description, {color: theme.colors.textSecondary}]}>
              A minimal React Native application demonstrating cross-platform development
              with shared codebase across iOS, Android, and Web.
            </Text>
          </View>

          <Card style={styles.card}>
            <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Version</Text>
            <Text style={[styles.value, {color: theme.colors.text}]}>0.1.0 (FAKE)</Text>
          </Card>

          <Card style={styles.card}>
            <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Platform</Text>
            <Text style={[styles.value, {color: theme.colors.text}]}>
              {Platform.OS.toUpperCase()}
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text style={[styles.label, {color: theme.colors.textSecondary}]}>Environment</Text>
            <Text style={[styles.value, {color: theme.colors.text}]}>
              {env.appEnv.toUpperCase()} (FAKE)
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text style={[styles.label, {color: theme.colors.textSecondary}]}>API URL</Text>
            <Text style={[styles.value, {color: theme.colors.text}]}>
              {env.apiUrl} (PLACEHOLDER)
            </Text>
          </Card>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, {color: theme.colors.text}]}>Stack</Text>
            <Text style={[styles.stackItem, {color: theme.colors.textSecondary}]}>
              • React Native CLI (native builds)
            </Text>
            <Text style={[styles.stackItem, {color: theme.colors.textSecondary}]}>
              • Vite + React Native Web (web)
            </Text>
            <Text style={[styles.stackItem, {color: theme.colors.textSecondary}]}>
              • React Navigation (all platforms)
            </Text>
            <Text style={[styles.stackItem, {color: theme.colors.textSecondary}]}>
              • TypeScript (strict mode)
            </Text>
            <Text style={[styles.stackItem, {color: theme.colors.textSecondary}]}>
              • Context API for state
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.placeholder, {color: theme.colors.textSecondary}]}>
              📚 Documentation: [Placeholder URL]
            </Text>
            <Text style={[styles.placeholder, {color: theme.colors.textSecondary}]}>
              🔗 Repository: [Placeholder URL]
            </Text>
          </View>
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  stackItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  placeholder: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default AboutScreen;
