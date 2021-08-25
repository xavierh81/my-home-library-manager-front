// Imports
import React from 'react';
import { t } from "@lingui/macro"

// Hooks
import { useAuth } from 'hooks/auth';

// Media
import logo from 'assets/images/logo.svg';

//
// Core
//
function Home() {
    const { isAuthenticated } = useAuth();
  
    console.log(`Is user authenticated: ${isAuthenticated()}`)
  
    return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>{t`test_word`}</p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
            </header>
        </div>
    )
    }

export default Home;
