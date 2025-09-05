import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { Provider } from 'react-redux';
import { client } from "./lib/apolloClient.ts";

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
                <App />
        </ApolloProvider>
    </React.StrictMode>,
);
