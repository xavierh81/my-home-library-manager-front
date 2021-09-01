
// Imports
import { Layout, Menu } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { t } from "@lingui/macro"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen, faSignOutAlt, faSlidersH, faPlusSquare, faAlignRight } from '@fortawesome/free-solid-svg-icons'

// Apollo
import { useApolloClient } from '@apollo/client';
import { getUser } from 'graphql/api';

// Load images
import DefaultAvatarImage from 'assets/images/default_avatar.png'

// Helpers
import { signOut } from 'helpers/auth';
import { Routes } from 'config/constants';

// Define main props types
type MainLayoutProps = {
  children: ReactNode
}

// Define main state type
type MainLayoutState = {
    user: any,
    currentMenuSelected: string
}

const MainLayout : React.FunctionComponent<MainLayoutProps> = ({children}) => {
  // Load hooks
  const apolloClient = useApolloClient();
  const history = useHistory();
  const location = useLocation();

  // Define state variables
  const [state, setState] = React.useState<MainLayoutState>({ user: null, currentMenuSelected: getSelectedMenuKey() });

  // Run this at the page mount
  useEffect(() => {
      // Retrieve user
      getUser(apolloClient).then((user) => {
        setState(prevState => ({ ...prevState, user}))
      })
      .catch((error) => {

      })
  }, [apolloClient])

  // 
  // Get the selected menu key from Query Path
  //
  function getSelectedMenuKey() : string {
    switch(location.pathname) {
      case "/":
        return "libraries";

      case "/add-media":
        return "add_media";

      case "/settings":
        return "settings";

      default:
        return "";
    }
  }

  //
  // UI Actions
  //
  const onLogoutClick = () => {
    signOut().then(() => {
      // Redirect to login
      history.push("/login")
    })
  }

  //
  // Rendering
  //
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider width={220}>
        <div className="menuHeader">
          <span>mhlm</span>
          <div className="icon">
            <FontAwesomeIcon icon={faBookOpen} />
          </div>
        </div>
        <div className="menuUserHeader">
          <div className="avatar"><img src={DefaultAvatarImage} alt="Default avatar" /></div>
          <span>{state.user != null ? `${state.user.firstName} ${state.user.lastName}` : ``}</span>
        </div>
        
        <Menu theme="dark" selectedKeys={[state.currentMenuSelected]} mode="inline">
          <Menu.Item key="libraries" icon={<FontAwesomeIcon icon={faAlignRight} rotation={90} />} onClick={() => history.push(Routes.HOME)}>{t`my_libraries_view_title`}</Menu.Item>
          <Menu.Item key="add_media" icon={<FontAwesomeIcon icon={faPlusSquare} />} onClick={() => history.push(Routes.ADD_MEDIA)}>{t`add_media_view_title`}</Menu.Item>
          <Menu.Divider />
          <Menu.Item key="settings" className="withTopSeparator" icon={<FontAwesomeIcon icon={faSlidersH} />} onClick={() => history.push(Routes.SETTINGS)}>{t`settings_view_title`}</Menu.Item>
          <Menu.Divider />
          <Menu.Item className="withTopSeparator" icon={<FontAwesomeIcon icon={faSignOutAlt} />} onClick={onLogoutClick}>{t`menu_logout_action`}</Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout">
        {children}
      </Layout>
    </Layout>
  )
}

export default MainLayout