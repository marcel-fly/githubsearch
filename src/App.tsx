import React from 'react';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Container } from '@mui/material';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Container>
                <HomePage />
            </Container>
        </QueryClientProvider>
    );
};

export default App;

