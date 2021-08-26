//
// Custom route component that extends the react route and add two new props:
// - title: Page title
// - authenticated: Boolean used to secure the page to only authenticated users
//

// Imports
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

// Helpers 
import { isStringEmpty } from 'helpers/string';

// Hooks
import { useAuth } from 'hooks/auth';

//
// Core
//
type PageRouteProps = {
  path: RouteProps['path'],
  component: React.ElementType,
  exact?: boolean | undefined,

  title?: string | null,
  authenticated?: boolean
}

const PageRoute: React.FunctionComponent<PageRouteProps> = ({
  component: Component,
  authenticated,
  title,
  ...routeProps
}) => {

  // Apply page title, if needed
  useEffect(() => {
    if(title !== undefined && isStringEmpty(title) === false) {
        document.title = `${title} | My Home Library Manager`;
    }
  });
  
  // Authentication verification
  let auth = useAuth();
  const onlyAuthenticatedUsers = authenticated !== undefined && authenticated != null && authenticated === true ? true : false

  return (
    <Route
      {...routeProps}
      render={(props) =>
        (
          !onlyAuthenticatedUsers 
          || (onlyAuthenticatedUsers && auth.isAuthenticated())
        ) ? (
          <Component /> 
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PageRoute;