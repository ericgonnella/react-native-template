import React from 'react';
import {render, screen} from '@testing-library/react-native';
import HomeScreen from '../../src/app/screens/Home';
import {AppProvider} from '../../src/app/state/AppContext';

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('HomeScreen (Native)', () => {
  it('renders the app title', () => {
    render(
      <AppProvider>
        <HomeScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    expect(screen.getByText('Welcome to RN Web App')).toBeTruthy();
  });

  it('renders navigation buttons', () => {
    render(
      <AppProvider>
        <HomeScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    expect(screen.getByText('View About')).toBeTruthy();
    expect(screen.getByText('View Examples')).toBeTruthy();
    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders feature list', () => {
    render(
      <AppProvider>
        <HomeScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    expect(screen.getByText(/Cross-platform/)).toBeTruthy();
    expect(screen.getByText(/TypeScript/)).toBeTruthy();
  });
});
