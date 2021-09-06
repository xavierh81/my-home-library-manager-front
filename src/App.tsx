// Imports
import React from 'react';
import { t } from "@lingui/macro"
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Components 
import PageRoute from 'components/routing/PageRoute'

// Pages
import Home from 'pages/Home';
import Login from 'pages/not_connected/Login';
import Register from 'pages/not_connected/Register';
import PageNotFound from 'pages/errors/PageNotFound';
import Settings from 'pages/Settings';

// Import style 
import 'assets/scss/main.style.scss'

// Config
import { Routes } from 'config/constants';

// Main render
function App() {
  return (
      <Router>
        <div>
          <Switch>
            
            <PageRoute path={Routes.HOME} exact component={ Home } title={t`my_libraries_view_title`} authenticated={true} />
            <PageRoute path={Routes.SETTINGS} exact component={ Settings } title={t`settings_view_title`} authenticated={true} />

            <PageRoute path={Routes.LOGIN} exact component={ Login } title={t`login_view_meta_title`} />
            <PageRoute path={Routes.SIGNUP} exact component={ Register } title={t`register_view_meta_title`} />

            <PageRoute path="*" component={PageNotFound} title={t`page_not_found_meta_title`}/>
             
          </Switch>
        </div>
      </Router>
  )
}

export default App;
