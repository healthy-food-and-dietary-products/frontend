/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { Producer } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Producers<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for producers.
	 *
	 * @tags producers
	 * @name ProducersList
	 * @request GET:/producers/
	 * @secure
	 */
	producersList = (params: RequestParams = {}) =>
		this.request<Producer[], any>({
			path: `/producers/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for producers.
	 *
	 * @tags producers
	 * @name ProducersCreate
	 * @request POST:/producers/
	 * @secure
	 */
	producersCreate = (data: Producer, params: RequestParams = {}) =>
		this.request<Producer, any>({
			path: `/producers/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for producers.
	 *
	 * @tags producers
	 * @name ProducersRead
	 * @request GET:/producers/{id}/
	 * @secure
	 */
	producersRead = (id: number, params: RequestParams = {}) =>
		this.request<Producer, any>({
			path: `/producers/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for producers.
	 *
	 * @tags producers
	 * @name ProducersPartialUpdate
	 * @request PATCH:/producers/{id}/
	 * @secure
	 */
	producersPartialUpdate = (id: number, data: Producer, params: RequestParams = {}) =>
		this.request<Producer, any>({
			path: `/producers/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for producers.
	 *
	 * @tags producers
	 * @name ProducersDelete
	 * @request DELETE:/producers/{id}/
	 * @secure
	 */
	producersDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/producers/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
