import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client'
import {ApolloProvider} from '@apollo/client/react'

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3100/graphql" }),
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
