import { Route, Routes } from 'react-router';
import Layout from './layouts/layout/layout.tsx';
import Home from './pages/home';
import Profile from './pages/profile/index.tsx';
import { ProtectedRoute } from './utils/protected-route.tsx';
// import { useAuth } from './hooks/use-auth.ts';
import Product from '@pages/product/index.tsx';
import Catalog from '@pages/catalog/index.tsx';
import { URLS } from '@data/constants.ts';
import PopupLogin from '@components/popups/popup-login';
import PopupRegistration from '@components/popups/popup-registration';
import ProfileUser from '@pages/profile/profile-user/index.tsx';
import PopupCheckEmail from '@components/popups/popup-check-email/index.tsx';
// импорт временных массивов для отображения каталогов и продуктов
// временное решение для верстки, потом удалить

// import { mainPageBlockLinks, products } from './data/dataExamples.ts';

// примеры рендера каталогов
// <CardCatalogLink title="Каталог" type="bento-grid" array={mainPageBlockLinks} />
// <CardCatalogLink title="Овощи" type="single-row" array={products} />

function App() {
	// const { isLoggedIn } = useAuth();

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
						element={<ProtectedRoute element={Profile} loggedIn={true} />}
					>
						<Route path="user" element={<ProfileUser />} />
						<Route index element={<h2>Мои заказы</h2>} />
						<Route path="addresses" element={<h2>Мои адреса</h2>} />
						<Route path="favorites" element={<h2>Избранное</h2>} />
					</Route>
					<Route path="/catalog/:category/:subcategory/:id" element={<Product />} />
				</Routes>
			</Layout>
			<PopupCheckEmail />
			<PopupLogin />
			<PopupRegistration />
		</div>
	);
}

export default App;
