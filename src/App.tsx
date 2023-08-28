import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from 'style/GlobalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from 'style/theme';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <div id="modal" />
            <GlobalStyle />
            <Router />
            <ReactQueryDevtools initialIsOpen={false} />
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
