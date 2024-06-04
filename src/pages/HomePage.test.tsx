import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './HomePage';
import { searchUsers } from '../api/github';

jest.mock('../api/github');

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('HomePage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display search results', async () => {
    const username = 'testuser';
    const data = {
      data: {
        items: [
          { login: 'testuser1' },
          { login: 'testuser2' },
        ],
      },
    };

    (searchUsers as jest.Mock).mockResolvedValue(data);

    renderWithClient(<HomePage />);

    const input = screen.getByPlaceholderText('Enter username');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: username } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(`Showing users for "${username}"`)).toBeInTheDocument();
    });

    data.data.items.forEach((user) => {
      expect(screen.getByText(user.login)).toBeInTheDocument();
    });
  });

  it('should display no users found message', async () => {
    const username = 'nouser';
    const data = {
      data: {
        items: [],
      },
    };

    (searchUsers as jest.Mock).mockResolvedValue(data);

    renderWithClient(<HomePage />);

    const input = screen.getByPlaceholderText('Enter username');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: username } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('No users found')).toBeInTheDocument();
    });
  });
});
