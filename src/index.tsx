// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import i18n
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import messages from 'locales/en/messages.json'

// Import Apollo
import { ApolloProvider } from '@apollo/client'
import initApollo from 'apollo/init'

// Auth
import {AuthProvider} from 'hooks/auth'

// Configure i18n
i18n.load('en', messages)
i18n.activate('en')

// Init Apollo
let apolloClient = initApollo()

// Render main app
ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);