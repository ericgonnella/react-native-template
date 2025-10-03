import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Switch, Alert, Platform} from 'react-native';
import {useApp} from '../state/AppContext';
import {SafeArea} from '../../components/layout/SafeArea';
import {Container} from '../../components/layout/Container';
import {Card} from '../../components/UI/Card';
import {Button} from '../../components/UI/Button';

const SettingsScreen: React.FC = () => {
  const {theme, colorScheme, toggleTheme, resetApp} = useApp();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    const confirmReset = () => {
      setIsResetting(true);
      resetApp()
        .then(() => {
          setIsResetting(false);
          if (Platform.OS === 'web') {
            alert('App reset successfully! Theme restored to light mode.');
          } else {
            Alert.alert('Success', 'App reset successfully! Theme restored to light mode.');
          }
        })
        .catch(error => {
          setIsResetting(false);
          console.error('Reset failed:', error);
        });
    };

    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to reset the app? This will clear all settings.')) {
        confirmReset();
      }
    } else {
      Alert.alert(
        'Reset App',
        'Are you sure you want to reset the app? This will clear all settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Reset', style: 'destructive', onPress: confirmReset},
        ],
      );
    }
  };

  return (
    <SafeArea>
      <ScrollView>
        <Container>
          <View style={styles.section}>
            <Text style={[styles.title, {color: theme.colors.text}]}>Appearance</Text>

            <Card>
              <View style={styles.settingRow}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingLabel, {color: theme.colors.text}]}>
                    Dark Mode
                  </Text>
                  <Text style={[styles.settingDescription, {color: theme.colors.textSecondary}]}>
                    Current theme: {colorScheme === 'dark' ? 'Dark' : 'Light'}
                  </Text>
                </View>
                <Switch
                  value={colorScheme === 'dark'}
                  onValueChange={toggleTheme}
                  trackColor={{false: theme.colors.border, true: theme.colors.primary}}
                  thumbColor="#FFFFFF"
                />
              </View>
            </Card>
          </View>

          <View style={styles.section}>
            <Text style={[styles.title, {color: theme.colors.text}]}>App Info</Text>

            <Card style={styles.card}>
              <Text style={[styles.infoLabel, {color: theme.colors.textSecondary}]}>
                Theme Persistence
              </Text>
              <Text style={[styles.infoValue, {color: theme.colors.text}]}>
                {Platform.OS === 'web' ? 'localStorage' : 'AsyncStorage'}
              </Text>
            </Card>

            <Card style={styles.card}>
              <Text style={[styles.infoLabel, {color: theme.colors.textSecondary}]}>
                Platform
              </Text>
              <Text style={[styles.infoValue, {color: theme.colors.text}]}>
                {Platform.OS.toUpperCase()}
              </Text>
            </Card>
          </View>

          <View style={styles.section}>
            <Text style={[styles.title, {color: theme.colors.text}]}>Actions</Text>
            <Button
              title={isResetting ? 'Resetting...' : 'Reset App'}
              onPress={handleReset}
              variant="outline"
              disabled={isResetting}
            />
            <Text style={[styles.warning, {color: theme.colors.textSecondary}]}>
              This will clear all app settings and restore defaults.
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
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  card: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
  },
  warning: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default SettingsScreen;
