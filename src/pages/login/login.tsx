import React from 'react';
import { useAuth } from '../../hooks/use-auth.ts';

const Login: React.FC = () => {
	const { login } = useAuth();
	const handleLogin = () => {
		login();
	};

	return (
		<div>
			<h2>Вход</h2>
			<button onClick={handleLogin}>Войти</button>
		</div>
	);
};

export default Login;
