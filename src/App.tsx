import React from 'react';
import Router from './routes/Router';
import GlobalStyle from 'style/GlobalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
