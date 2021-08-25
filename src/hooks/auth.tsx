/* eslint-disable @typescript-eslint/no-redeclare */
// Imports
import React from 'react';

//
// Define the Context
//
export interface AuthContext {}

export const AuthContext = React.createContext<AuthContext>({} as AuthContext);

//
// Define the Provider
//

export interface AuthProvider {
	children: React.ReactNode;
}

export function AuthProvider({
	children,
}: AuthProvider) 
{
	const [contextValue] = React.useState<AuthContext>({ });

	// Lift the context value into the parent's state to avoid triggering
	// unintentional renders in the consumers
	/*React.useEffect(() => {
		setContextValue({ ...contextValue });
	}, []);
	*/

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

//
// Define hook
//
export interface UseAuth {
	isAuthenticated: () => boolean
}

export function useAuth(): UseAuth {

	function isAuthenticated() {
		return false
	}

	return {
		isAuthenticated,
	};
}