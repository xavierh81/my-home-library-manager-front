// Imports
import React, { FunctionComponent, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';

// Helpers 
import { isStringEmpty } from 'helpers/string';

//
// Core
//
interface IPageProps extends RouteProps {
  title?: string | null;
}

const PageRoute: FunctionComponent<IPageProps> = props => {
  useEffect(() => {
    if(props.title !== undefined && isStringEmpty(props.title) === false) {
        document.title = `${props.title} | My Home Library Manager`;
    }
  });

  const { title, ...rest } = props;
  return <Route {...rest} />;
};

export default PageRoute;