import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserRepositories from './UserRepositories';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getUserRepos as mockGetUserRepos } from '../api/github';

jest.mock('../api/github', () => ({
    searchUsers: jest.fn(),
    getUserRepos: jest.fn(() => Promise.resolve({ data: [] })),
}));

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
};

describe('UserRepositories', () => {
    test('renders loading state initially', () => {
        renderWithClient(<UserRepositories username="testuser" />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders repositories after loading', async () => {
        (mockGetUserRepos as jest.Mock).mockResolvedValueOnce({
            data: [
                { name: 'repo1', description: 'Repo 1 description', stargazers_count: 5 },
                { name: 'repo2', description: 'Repo 2 description', stargazers_count: 10 },
            ],
        });

        renderWithClient(<UserRepositories username="testuser" />);

        expect(await screen.findByText(/repo1/i)).toBeInTheDocument();
        expect(await screen.findByText(/repo2/i)).toBeInTheDocument();
        expect(screen.getByText(/Repo 1 description/i)).toBeInTheDocument();
        expect(screen.getByText(/Repo 2 description/i)).toBeInTheDocument();
        expect(screen.getByText(/5/i)).toBeInTheDocument();
        expect(screen.getByText(/10/i)).toBeInTheDocument();
    });

    test('renders no repositories message when no repos found', async () => {
        (mockGetUserRepos as jest.Mock).mockResolvedValueOnce({ data: [] });

        renderWithClient(<UserRepositories username="testuser" />);

        expect(await screen.findByText(/No repos found/i)).toBeInTheDocument();
        expect(screen.queryByText(/repo1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/repo2/i)).not.toBeInTheDocument();
    });
});
