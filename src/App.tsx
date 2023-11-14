import { Route, Routes } from 'react-router';
import Layout from './layouts/layout/layout.tsx';
import Home from './pages/home';
import Profile from './pages/profile/profile.tsx';
import { ProtectedRoute } from './utils/protected-route.tsx';
import { useAuth } from './hooks/use-auth.ts';
import Product from '@pages/product/index.tsx';
import Catalog from '@pages/catalog/index.tsx';
import { URLS } from '@data/constants.ts';
import PopupLogin from '@components/popups/popup-login';
import PopupRegistration from '@components/popups/popup-registration';
// импорт временных массивов для отображения каталогов и продуктов
// временное решение для верстки, потом удалить

// import { mainPageBlockLinks, products } from './data/dataExamples.ts';

// примеры рендера каталогов
// <CardCatalogLink title="Каталог" type="bento-grid" array={mainPageBlockLinks} />
// <CardCatalogLink title="Овощи" type="single-row" array={products} />

function App() {
	const { isLoggedIn } = useAuth();

	// useEffect(() => {
	// 	api.productsList("?category=nuts-dried-fruits")
	// 		.then((data) => {
	// 			console.log(data)
	// 		})
	// 	api.categoriesList()
	// 		.then((data) => {
	// 			console.log(data)
	// 		})
	// }, [])

	return (
		<div className="app">
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path={URLS.CATALOG} element={<Catalog />} />
					<Route
						path={URLS.PROFILE}
						element={<ProtectedRoute element={Profile} loggedIn={isLoggedIn} />}
					/>
					<Route path="/catalog/:category/:id" element={<Product />} />
				</Routes>
			</Layout>
			<PopupLogin />
			<PopupRegistration />
		</div>
	);
}

export default App;
