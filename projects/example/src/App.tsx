import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {configure} from 'react-query-useful-hooks';
import axios from 'axios';
import Books from './Books';
import './App.css';

configure({
  axios: axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000
  }),
  queryOptions: {
    retry: 5,
    retryDelay: 100,
    retryOnMount: false
  }
});

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <Books />
        </header>
      </div>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />}
    </QueryClientProvider>
  );
}

export default App;
