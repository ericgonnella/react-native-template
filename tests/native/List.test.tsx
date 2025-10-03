import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import ListScreen from '../../src/app/screens/examples/List';
import {AppProvider} from '../../src/app/state/AppContext';

const mockNavigation = {
  navigate: jest.fn(),
} as any;

// Mock the random failure to always succeed in tests
jest.mock('../../src/app/mock/delay', () => ({
  withRandomFailure: jest.fn(async fn => {
    await new Promise(resolve => setTimeout(resolve, 10));
    return fn();
  }),
}));

describe('ListScreen (Native)', () => {
  it('shows loading state initially', () => {
    render(
      <AppProvider>
        <ListScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    expect(screen.getByTestId('activity-indicator')).toBeTruthy();
  });

  it('renders list of items after loading', async () => {
    render(
      <AppProvider>
        <ListScreen navigation={mockNavigation} />
      </AppProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('First Item')).toBeTruthy();
    });

    expect(screen.getByText('Second Item')).toBeTruthy();
  });
});
