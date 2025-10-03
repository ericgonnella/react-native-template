import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeScreen from '../../src/app/screens/Home';
import {AppProvider} from '../../src/app/state/AppContext';

const mockNavigation = {
  navigate: jest.fn(),
} as any;

describe('HomeScreen (Web)', () => {
  it('renders the app title', () => {
    render(
      <AppProvider>
        <HomeScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    expect(screen.getByText('Welcome to RN Web App')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(
      <AppProvider>
        <HomeScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    expect(screen.getByText('View About')).toBeInTheDocument();
    expect(screen.getByText('View Examples')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
