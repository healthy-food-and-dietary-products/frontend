import type { ProducerType, ProductType } from '@data/types';
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
	getProducers() {
		return this._request('producers/', {
			method: 'GET',
		});
	}

	getProducer(id: number) {
		return this._request(`producers/${id}/`, {
			method: 'GET',
		});
	}

	postProducers(producer: ProducerType) {
		return this._request('producers/', {
			method: 'POST',
			body: JSON.stringify({
				name: producer.name,
				slug: producer.slug,
				producer_type: producer.producer_type,
				description: producer.description,
				address: producer.address,
			}),
		});
	}

	patchProducer(id: number, producer: ProducerType) {
		return this._request(`producers/${id}/`, {
			method: 'PATCH',
			body: JSON.stringify({
				name: producer.name,
				slug: producer.slug,
				producer_type: producer.producer_type,
				description: producer.description,
				address: producer.address,
			}),
		});
	}

	deleteProducer(id: number) {
		return this._request(`producers/${id}/`, {
			method: 'DELETE',
		});
	}

	/* ----------------------------- Products ----------------------------- */
	getProducts() {
		return this._request('products/', {
			method: 'GET',
		});
	}

	postProducts(product: ProductType) {
		return this._request('products/', {
			method: 'POST',
			body: JSON.stringify(product),
		});
	}

	getProduct(id: number) {
		return this._request(`product/${id}/`, {
			method: 'GET',
		});
	}

	patchProduct(id: number, { ...data }: ProductType) {
		return this._request(`products/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ ...data }),
		});
	}

	deleteProduct(id: number) {
		return this._request(`products/${id}`, {
			method: 'DELETE',
		});
	}

	postFavoriteProduct(id: number) {
		return this._request(`products/${id}/favorite/`, {
			method: 'POST',
			// body: JSON.stringify({ ...data }),
		});
	}

	deleteFavoriteProduct(id: number) {
		return this._request(`products/${id}/favorite/`, {
			method: 'DELETE',
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
}

export default Api;
