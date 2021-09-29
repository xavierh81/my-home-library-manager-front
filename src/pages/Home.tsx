// Imports
import React from 'react';

// Apollo / GraphQL


// Components
import MainLayout from 'components/templates/MainLayout';

//
// Core
//

// Define main state type
type HomeState = {
    user: any
}

// Main element
function Home() {
    // Define state variables
    const [state, setState] = React.useState<HomeState>({ user: null });

    // Render
    return (
        <MainLayout>
            Test home layout
            {state.user != null && <span>{state.user.name}</span>}
        </MainLayout>
    )
}

export default Home;
