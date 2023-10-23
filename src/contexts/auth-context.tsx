import React, { createContext, useState, ReactNode } from 'react';

type AuthContextType = {
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
