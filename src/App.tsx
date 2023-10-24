import './App.css';
import { Route, Routes } from 'react-router';
import Layout from './layouts/layout/layout.tsx';
import Home from './pages/home/home.tsx';
import Profile from './pages/profile/profile.tsx';
import Login from './pages/login/login.tsx';
import { ProtectedRoute } from './utils/protected-route.tsx';
import { useAuth } from './hooks/use-auth.ts';

function App() {
	const { isLoggedIn } = useAuth();

	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/profile"
					element={<ProtectedRoute element={Profile} loggedIn={isLoggedIn} />}
				/>
				<Route path="/login" element={<Login />} />
			</Routes>
		</Layout>
	);
}

export default App;
