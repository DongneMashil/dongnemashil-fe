import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from 'style/GlobalStyle';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <GlobalStyle />
          <Router />
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
