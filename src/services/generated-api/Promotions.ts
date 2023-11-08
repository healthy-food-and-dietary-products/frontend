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

import { Promotion } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Promotions<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for promotions.
	 *
	 * @tags promotions
	 * @name PromotionsList
	 * @request GET:/promotions/
	 * @secure
	 */
	promotionsList = (params: RequestParams = {}) =>
		this.request<Promotion[], any>({
			path: `/promotions/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for promotions.
	 *
	 * @tags promotions
	 * @name PromotionsCreate
	 * @request POST:/promotions/
	 * @secure
	 */
	promotionsCreate = (data: Promotion, params: RequestParams = {}) =>
		this.request<Promotion, any>({
			path: `/promotions/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for promotions.
	 *
	 * @tags promotions
	 * @name PromotionsRead
	 * @request GET:/promotions/{id}/
	 * @secure
	 */
	promotionsRead = (id: number, params: RequestParams = {}) =>
		this.request<Promotion, any>({
			path: `/promotions/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for promotions.
	 *
	 * @tags promotions
	 * @name PromotionsPartialUpdate
	 * @request PATCH:/promotions/{id}/
	 * @secure
	 */
	promotionsPartialUpdate = (id: number, data: Promotion, params: RequestParams = {}) =>
		this.request<Promotion, any>({
			path: `/promotions/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for promotions.
	 *
	 * @tags promotions
	 * @name PromotionsDelete
	 * @request DELETE:/promotions/{id}/
	 * @secure
	 */
	promotionsDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/promotions/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
