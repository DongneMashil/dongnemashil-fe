import React, { useEffect } from 'react';
import Router from 'routes/Router';
import GlobalStyle from 'style/GlobalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme } from 'style/theme';
import VConsole from 'vconsole';

function App() {
  useEffect(() => {
    const vconsole = new VConsole({ theme: 'light' });
    console.log('vconsole', vconsole);
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
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
