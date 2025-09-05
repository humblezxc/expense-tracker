import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import {BrowserRouter} from "react-router-dom";
import { client } from "./lib/apolloClient.ts";

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);
