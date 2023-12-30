import type {
	UserCreate,
	Activation,
	User,
	SendEmailReset,
	PasswordResetConfirm,
	UsernameResetConfirm,
	SetPassword,
	SetUsername,
	ShoppingCartPostUpdateDelete,
	Producer,
	ProductCreate,
	ProductUpdate,
	TokenCreate,
	CategoryCreate,
	Component,
	Promotion,
	Subcategory,
	Tag,
	OrderPostAdd,
	ReviewCreate,
	ReviewUpdate,
} from './generated-api/data-contracts';
import { BACKEND_URL } from '@data/constants.ts';
import Cookies from 'js-cookie';

class Api {
	private _baseUrl: string;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	_checkResponse(res: Response) {
		if (res.ok) {
			if (res.status === 204 || res.status === 205) return res;
			return res.json();
		}

		const errorFromServer = res.json().then((err) => {
			err.status = res.status;
			err.statusText = res.statusText;
			throw err;
		});
		return errorFromServer;
	}

	_request(endPoint: string, options = {}) {
		const params = {
			...options,
		};
		return fetch(`${this._baseUrl}/${endPoint}`, params).then(this._checkResponse);
	}

	/* -------------------------------- Token -------------------------------- */
	tokenLoginCreate(data: TokenCreate) {
		return this._request('token/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}

	tokenLogoutCreate() {
		return this._request('token/logout/', {
			method: 'POST',
			headers: {
				Authorization: `Token ${Cookies.get('token')}`,
			},
		});
	}

	/* ------------------------------- Users ------------------------------- */

	usersList() {
		return this._request('users/', {
			method: 'GET',
		});
	}

	usersCreate(data: UserCreate) {
		return this._request('users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}

	postUsersActivation(data: Activation) {
		return this._request('users/activation/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersMeRead() {
		return this._request('users/me/', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
			method: 'GET',
		});
	}

	usersMeUpdate(data: User) {
		return this._request('users/me/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
			body: JSON.stringify(data),
		});
	}

	usersMePartialUpdate(data: User) {
		return this._request('users/me/', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
			body: JSON.stringify(data),
		});
	}

	usersMeDelete() {
		return this._request('users/me/', {
			method: 'DELETE',
		});
	}

	usersResendActivation(data: SendEmailReset) {
		return this._request('users/resend_activation/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersResetPassword(data: SendEmailReset) {
		return this._request('users/reset_password/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersResetPasswordConfirm(data: PasswordResetConfirm) {
		return this._request('users/reset_password_confirm/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersResetUsername(data: SendEmailReset) {
		return this._request('users/reset_username/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersResetUsernameConfirm(data: UsernameResetConfirm) {
		return this._request('users/reset_username_confirm/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersSetPassword(data: SetPassword) {
		return this._request('users/set_password/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersSetUsername(data: SetUsername) {
		return this._request('users/set_username/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersRead(id: number) {
		return this._request(`users/${id}/`, {
			method: 'GET',
		});
	}

	usersUpdate(id: number, data: User) {
		return this._request(`users/${id}/`, {
			method: 'PUT',
			body: JSON.stringify(data),
		});
	}

	usersPartialUpdate(id: number, data: User) {
		return this._request(`users/${id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
			body: JSON.stringify(data),
		});
	}

	usersDelete(id: number) {
		return this._request(`users/${id}/`, {
			method: 'DELETE',
		});
	}

	usersAddressesList(userId: string) {
		return this._request(`users/${userId}/addresses/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
		});
	}

	usersAddressesRead(userId: string, id: string) {
		return this._request(`users/${userId}/addresses/${id}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
		});
	}

	usersOrderList() {
		return this._request(`order/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
		});
	}

	usersOrderCreate(data: OrderPostAdd) {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		const token = Cookies.get('token');
		if (token) {
			headers.Authorization = `Token ${token}`;
		}
		return this._request(`order/`, {
			method: 'POST',
			headers,
			body: JSON.stringify(data),
			credentials: 'include',
		});
	}

	usersOrderRead(userId: string, id: number) {
		return this._request(`users/${userId}/order/${id}/`, {
			method: 'GET',
		});
	}

	usersOrderDelete(userId: string, id: number) {
		return this._request(`users/${userId}/order/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ---------------------------- ShoppingCart ---------------------------- */
	usersShoppingCartList() {
		return this._request(`shopping_cart/`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	usersShoppingCartCreate(data: ShoppingCartPostUpdateDelete) {
		return this._request(`shopping_cart/`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}

	usersShoppingCartDelete(id: number) {
		return this._request(`shopping_cart/${id}/`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	usersShoppingCartDeleteAll() {
		return this._request('shopping_cart/remove_all/', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	/* ----------------------------- Products ----------------------------- */
	productsList(slug: string) {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		const token = Cookies.get('token');
		if (token) {
			headers.Authorization = `Token ${token}`;
		}
		return this._request(`products${'/' + slug}`, {
			method: 'GET',
			headers,
		});
	}

	productsCreate(data: ProductCreate) {
		return this._request('products/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	productsRead(id: number) {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		const token = Cookies.get('token');
		if (token) {
			headers.Authorization = `Token ${token}`;
		}
		return this._request(`products/${id}/`, {
			method: 'GET',
			headers,
		});
	}

	productsPartialUpdate(id: number, data: ProductUpdate) {
		return this._request(`products/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	productsDelete(id: number) {
		return this._request(`products/${id}`, {
			method: 'DELETE',
		});
	}

	productsFavoriteCreate(id: number) {
		return this._request(`products/${id}/favorite/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
		});
	}

	productsFavoriteDelete(id: number) {
		return this._request(`products/${id}/favorite/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
		});
	}

	/* -------------------------- FavoriteProducts -------------------------- */
	favoriteProductsList() {
		return this._request('favorite-products/', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'GET',
		});
	}

	favoriteProductsRead(id: number) {
		return this._request(`favorite-products/${id}/`, {
			method: 'GET',
		});
	}

	/* ----------------------------- Producers ----------------------------- */
	producersList() {
		return this._request('producers/', {
			method: 'GET',
		});
	}

	producersRead(id: number) {
		return this._request(`producers/${id}/`, {
			method: 'GET',
		});
	}

	producersCreate(data: Producer) {
		return this._request('producers/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	producersPartialUpdate(id: number, data: Producer) {
		return this._request(`producers/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	producersDelete(id: number) {
		return this._request(`producers/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ----------------------------- Categories ----------------------------- */
	categoriesList() {
		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		};
		const token = Cookies.get('token');
		if (token) {
			headers.Authorization = `Token ${token}`;
		}
		return this._request('categories', {
			method: 'GET',
			headers,
		});
	}

	categoriesCreate(data: CategoryCreate) {
		return this._request('categories/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	categoriesRead(id: number) {
		return this._request(`categories/${id}/`, {
			method: 'GET',
		});
	}

	categoriesPartialUpdate(id: number, data: CategoryCreate) {
		return this._request(`categories/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	categoriesDelete(id: number) {
		return this._request(`categories/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ---------------------------- Subcategories ---------------------------- */
	subcategoriesList() {
		return this._request('subcategories/', {
			method: 'GET',
		});
	}

	subcategoriesCreate(data: Subcategory) {
		return this._request('subcategories/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	subcategoriesRead(id: number) {
		return this._request(`subcategories/${id}/`, {
			method: 'GET',
		});
	}

	subcategoriesPartialUpdate(id: number, data: Subcategory) {
		return this._request(`subcategories/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	subcategoriesDelete(id: number) {
		return this._request(`subcategories/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ----------------------------- Components ----------------------------- */
	componentsList() {
		return this._request('components/', {
			method: 'GET',
		});
	}

	componentsCreate(data: Component) {
		return this._request('components/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	componentsRead(id: number) {
		return this._request(`components/${id}/`, {
			method: 'GET',
		});
	}

	componentsPartialUpdate(id: number, data: Component) {
		return this._request(`components/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	componentsDelete(id: number) {
		return this._request(`components/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ----------------------------- Promotions ----------------------------- */
	promotionsList() {
		return this._request('promotions/', {
			method: 'GET',
		});
	}

	promotionsCreate(data: Promotion) {
		return this._request('promotions/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	promotionsRead(id: number) {
		return this._request(`promotions/${id}/`, {
			method: 'GET',
		});
	}

	promotionsPartialUpdate(id: number, data: Promotion) {
		return this._request(`promotions/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	promotionsDelete(id: number) {
		return this._request(`promotions/${id}/`, {
			method: 'DELETE',
		});
	}

	/* -------------------------------- Tags -------------------------------- */
	tagsList() {
		return this._request('tags/', {
			method: 'GET',
		});
	}

	tagsCreate(data: Tag) {
		return this._request('tags/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	tagsRead(id: number) {
		return this._request(`tags/${id}/`, {
			method: 'GET',
		});
	}

	tagsPartialUpdate(id: number, data: Tag) {
		return this._request(`tags/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	tagsDelete(id: number) {
		return this._request(`tags/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ------------------------------- Recipes ------------------------------- */
	recipesList() {
		return this._request('recipes/', {
			method: 'GET',
		});
	}

	getRecipeById(id: number) {
		return this._request(`recipes/${id}`, {
			method: 'GET',
		});
	}

	/* ------------------------ Ratings and Reviews -------------------------- */
	reviewsCreate(productId: number, data: ReviewCreate) {
		return this._request(`products/${productId}/reviews/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
			body: JSON.stringify(data),
		});
	}

	reviewsUpdate(productId: number, reviewId: number, data: ReviewUpdate) {
		return this._request(`products/${productId}/reviews/${reviewId}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Token ${Cookies.get('token')}`,
			},
			body: JSON.stringify(data),
		});
	}

	reviewsList(productId: number) {
		return this._request(`products/${productId}/reviews/`, {
			method: 'GET',
		});
	}
}

const api = new Api(BACKEND_URL);

export default api;
