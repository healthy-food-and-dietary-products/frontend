import { ProducerType } from '@data/types';

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
				// Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
}

export default Api;
