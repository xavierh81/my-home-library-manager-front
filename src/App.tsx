// Imports
import React from 'react';
import { t } from "@lingui/macro"
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Components 
import PageRoute from 'components/routing/PageRoute'
import PrivatePageRoute from 'components/routing/PrivatePageRoute'

// Pages
import Home from 'pages/Home';
import Login from 'pages/Login';
import PageNotFound from 'pages/errors/PageNotFound';

// Import style 
import 'assets/scss/main.style.scss'

function App() {
  return (
      <Router>
        <div>
          <Switch>
            
            <PrivatePageRoute path="/" exact component={ Home } />

            <PageRoute path="/login" exact component={ Login } title={t`login_view_meta_title`} />

            <PageRoute component={PageNotFound} title={t`page_not_found_meta_title`}/>
             
          </Switch>
        </div>
      </Router>
  )
}

export default App;
