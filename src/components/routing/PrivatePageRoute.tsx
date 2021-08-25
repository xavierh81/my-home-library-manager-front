// Imports
import React from 'react';
import {
    Redirect,
  } from "react-router-dom";

// Components 
import PageRoute from 'components/routing/PageRoute'

// Hooks
import { useAuth } from 'hooks/auth';

//
// Define new PrivatePageRoute component with auto redirect to login
//
const PrivatePageRoute = ({component, ...rest}: any) => {
    let auth = useAuth();

    return (
      <PageRoute
        {...rest}
        render={({ location }) =>
          auth.isAuthenticated() ? (
            component
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export default PrivatePageRoute;