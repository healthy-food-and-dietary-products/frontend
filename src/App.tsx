import { Route, Routes } from 'react-router';
import Layout from './layouts/layout/layout.tsx';
import Home from './pages/home';
import Profile from './pages/profile/profile.tsx';
import Login from './pages/login/login.tsx';
import { ProtectedRoute } from './utils/protected-route.tsx';
import { useAuth } from './hooks/use-auth.ts';

// импорт временных массивов для отображения каталогов и продуктов
// временное решение для верстки, потом удалить

// import { mainPageBlockLinks, products } from './data/dataExamples.ts';

// примеры рендера каталогов
// <CardCatalogLink title="Каталог" type="bento-grid" array={mainPageBlockLinks} />
// <CardCatalogLink title="Овощи" type="single-row" array={products} />

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
