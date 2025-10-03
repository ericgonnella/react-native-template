import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Platform, Linking} from 'react-native';
import {useApp} from '../state/AppContext';

// Screens
import HomeScreen from '../screens/Home';
import AboutScreen from '../screens/About';
import SettingsScreen from '../screens/Settings';
import ListScreen from '../screens/examples/List';
import DetailScreen from '../screens/examples/Detail';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Settings: undefined;
  List: undefined;
  Detail: {id: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: Platform.OS === 'web' ? [window.location.origin] : [],
  config: {
    screens: {
      Home: '/',
      About: '/about',
      Settings: '/settings',
      List: '/examples/list',
      Detail: '/examples/detail/:id',
    },
  },
};

export const Navigation: React.FC = () => {
  const {theme} = useApp();

  return (
    <NavigationContainer
      linking={linking}
      fallback={<></>}
      theme={{
        dark: theme.isDark,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.card,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.notification,
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'RN Web App'}} />
        <Stack.Screen name="About" component={AboutScreen} options={{title: 'About'}} />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: 'Settings'}}
        />
        <Stack.Screen
          name="List"
          component={ListScreen}
          options={{title: 'Examples List'}}
        />
        <Stack.Screen name="Detail" component={DetailScreen} options={{title: 'Detail'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
