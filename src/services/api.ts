import type { ProducerType, ProductType } from '@data/types';

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

	getFavoriteProducts() {
		return this._request('favorite-products/', {
			method: 'GET',
		});
	}

	getFavoriteProduct(id: number) {
		return this._request(`favorite-products/${id}/`, {
			method: 'GET',
		});
	}

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

	postFavoriteProduct(id: number, { ...data }: ProductType) {
		return this._request(`products/${id}/favorite/`, {
			method: 'POST',
			body: JSON.stringify({ ...data }),
		});
	}

	deleteFavoriteProduct(id: number) {
		return this._request(`products/${id}/favorite/`, {
			method: 'DELETE',
		});
	}
}

export default Api;
