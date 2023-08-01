import React from 'react';
import Router from 'routes/Router';
import GlobalStyle from 'style/GlobalStyle';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'queries/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import store from 'redux/config/configureStore';

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Provider store={store}>
          <Router />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
