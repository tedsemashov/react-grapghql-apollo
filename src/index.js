import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import {
    ApolloProvider,
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import './styles/index.css';
import App from './components/App';
import { AUTH_TOKEN } from './constants';

// We create the httpLink that will connect our ApolloClient instance with the GraphQL API.
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
});

// This middleware will be invoked every time ApolloClient sends a request to the server.
// Apollo Links allow us to create middlewares that modify requests before they are sent to the server.
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// We instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache.
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
    </BrowserRouter>,
);
