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
}

export default Api;
