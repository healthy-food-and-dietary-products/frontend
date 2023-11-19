import React, { createContext, useState, ReactNode, useEffect } from 'react';
import api from '@services/api.ts';
import Cookies from 'js-cookie';

type AuthContextType = {
	isLoggedIn: boolean;
	user: Record<string, unknown>;
	loading: boolean;
	updateUsers: (newUserData: Record<string, unknown>) => void;
	checkAuthentication: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	user: {},
	loading: true,
	updateUsers: () => {},
	checkAuthentication: () => Promise.resolve(),
	logout: () => Promise.resolve(),
});

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	const checkAuthentication = async () => {
		try {
			const user = await api.usersMeRead();
			setUser(user);
			setIsLoggedIn(true);
		} catch (err) {
			setIsLoggedIn(false);
		} finally {
			setLoading(false);
		}
	};

	const logout = () => {
		return api.tokenLogoutCreate().finally(() => {
			Cookies.remove('token');
			setIsLoggedIn(false);
			setUser({});
		});
	};

	useEffect(() => {
		checkAuthentication();
	}, []);

	const updateUsers = (newUserData: Record<string, unknown>) => {
		setUser(newUserData);
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn, user, updateUsers, loading, checkAuthentication, logout }}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
