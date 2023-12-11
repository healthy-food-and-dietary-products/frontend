import { Route, Routes } from 'react-router';
import Layout from './layouts/layout/layout.tsx';
import Home from './pages/home';
import Profile from './pages/profile/index.tsx';
import { ProtectedRoute } from './utils/protected-route.tsx';
import { useAuth } from './hooks/use-auth.ts';
import Product from '@pages/product/index.tsx';
import Catalog from '@pages/catalog/index.tsx';
import { URLS } from '@data/constants.ts';
import PopupLogin from '@components/popups/popup-login';
import PopupRegistration from '@components/popups/popup-registration';
import ProfileUser from '@pages/profile/profile-user/index.tsx';
import ProfileAddresses from '@pages/profile/profile-addresses/index.tsx';
import Category from '@pages/category';
import ProfileFavorites from '@pages/profile/profile-favorites/index.tsx';
import Checkout from '@pages/checkout/index.tsx';
import ShoppingCart from '@pages/shopping-cart/index.tsx';
import ProfileOrders from '@pages/profile/profile-orders/index.tsx';
import Recipes from '@pages/recipe/index.tsx';
import Contacts from '@pages/contacts/index.tsx';
import NotFound from '@pages/not_found/not-found.tsx';
import { CartProvider } from '@contexts/cart-context.tsx';
import Agreement from '@pages/agreement/index.tsx';

// импорт временных массивов для отображения каталогов и продуктов
// временное решение для верстки, потом удалить

// import { mainPageBlockLinks, products } from './data/dataExamples.ts';

// примеры рендера каталогов
// <CardCatalogLink title="Каталог" type="bento-grid" array={mainPageBlockLinks} />
// <CardCatalogLink title="Овощи" type="single-row" array={products} />

function App() {
	const { isLoggedIn } = useAuth();

	return (
		<CartProvider>
			<div className="app">
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path={URLS.CATALOG} element={<Catalog />} />
						<Route path="/catalog/:category" element={<Category />} />
						<Route path="/catalog/:category/:id" element={<Product />} />
						<Route path="/cart" element={<ShoppingCart />} />
						<Route path="/cart/order" element={<Checkout />} />
						<Route path="/recipes" element={<Recipes />} />
						<Route path="/contacts" element={<Contacts />} />
						<Route
							path={URLS.PROFILE}
							element={<ProtectedRoute element={Profile} loggedIn={isLoggedIn} />}
						>
							<Route index element={<ProfileUser />} />
							<Route path="orders" element={<ProfileOrders />} />
							<Route path="addresses" element={<ProfileAddresses />} />
							<Route path="favorites" element={<ProfileFavorites />} />
						</Route>
						<Route path={URLS.AGREEMENT} element={<Agreement />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
				<PopupLogin />
				<PopupRegistration />
			</div>
		</CartProvider>
	);
}

export default App;
