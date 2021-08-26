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

// Import style 
import 'assets/scss/main.style.scss'

function App() {
  return (
      <Router>
        <div>
          <Switch>
            
            <PageRoute path="/" exact component={ Home } authenticated={true} />

            <PageRoute path="/login" exact component={ Login } title={t`login_view_meta_title`} />
            <PageRoute path="/signup" exact component={ Register } title={t`login_view_meta_title`} />

            <PageRoute path="*" component={PageNotFound} title={t`page_not_found_meta_title`}/>
             
          </Switch>
        </div>
      </Router>
  )
}

export default App;
