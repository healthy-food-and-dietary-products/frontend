import type {
	UserCreate,
	Activation,
	User,
	SendEmailReset,
	PasswordResetConfirm,
	UsernameResetConfirm,
	SetPassword,
	SetUsername,
	OrderPostDelete,
	ShoppingCartPostUpdateDelete,
	Producer,
	ProductCreate,
	ProductUpdate,
	FavoriteProductCreate,
	TokenCreate,
	CategoryCreate,
	Component,
	Promotion,
	Subcategory,
} from './generated-api/data-contracts';

class Api {
	private _baseUrl: string;

	constructor(baseUrl: string) {
		this._baseUrl = baseUrl;
	}

	_checkResponse(res: Response) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(new Error(`Ошибка: ${res.statusText}`));
	}

	_request(endPoint: string, options = {}) {
		const params = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Token 34b3fc1d398c10daa1c2b945b7041f5615eecde9',
			},
			...options,
		};
		return fetch(`${this._baseUrl}/${endPoint}`, params).then(this._checkResponse);
	}

	/* -------------------------------- Token -------------------------------- */
	tokenLoginCreate(data: TokenCreate) {
		return this._request('token/login/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	tokenLogoutCreate() {
		return this._request('token/logout/', {
			method: 'POST',
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
			method: 'GET',
		});
	}

	usersMeUpdate(data: User) {
		return this._request('users/me/', {
			method: 'PUT',
			body: JSON.stringify(data),
		});
	}

	usersMePartialUpdate(data: User) {
		return this._request('users/me/', {
			method: 'PATCH',
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
		});
	}

	usersAddressesRead(userId: string, id: string) {
		return this._request(`users/${userId}/addresses/${id}/`, {
			method: 'GET',
		});
	}

	usersOrderList(userId: string) {
		return this._request(`users/${userId}/order/`, {
			method: 'GET',
		});
	}

	usersOrderCreate(userId: string, data: OrderPostDelete) {
		return this._request(`users/${userId}/order/`, {
			method: 'POST',
			body: JSON.stringify(data),
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

	usersShoppingCartList(userId: string) {
		return this._request(`users/${userId}/shopping_cart/`, {
			method: 'GET',
		});
	}

	usersShoppingCartCreate(userId: string, data: ShoppingCartPostUpdateDelete) {
		return this._request(`users/${userId}/shopping_cart/`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	usersShoppingCartRead(userId: string, id: number) {
		return this._request(`users/${userId}/shopping_cart/${id}/`, {
			method: 'GET',
		});
	}

	usersShoppingCartPartialUpdate(
		userId: string,
		id: number,
		data: ShoppingCartPostUpdateDelete
	) {
		return this._request(`users/${userId}/shopping_cart/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	usersShoppingCartDelete(userId: string, id: number) {
		return this._request(`users/${userId}/shopping_cart/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ----------------------------- Products ----------------------------- */
	productsList() {
		return this._request('products/', {
			method: 'GET',
		});
	}

	productsCreate(data: ProductCreate) {
		return this._request('products/', {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	productsRead(id: number) {
		return this._request(`product/${id}/`, {
			method: 'GET',
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

	productsFavoriteCreate(id: number, data: FavoriteProductCreate) {
		return this._request(`products/${id}/favorite/`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	productsFavoriteDelete(id: number) {
		return this._request(`products/${id}/favorite/`, {
			method: 'DELETE',
		});
	}

	/* -------------------------- FavoriteProducts -------------------------- */
	favoriteProductsList() {
		return this._request('favorite-products/', {
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
		return this._request('categories/', {
			method: 'GET',
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
}

export default Api;
