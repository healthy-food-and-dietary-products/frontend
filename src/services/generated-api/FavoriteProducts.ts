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

import { FavoriteProduct } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class FavoriteProducts<
	SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for viewing useres' favorite products by admins.
	 *
	 * @tags favorite-products
	 * @name FavoriteProductsList
	 * @request GET:/favorite-products/
	 * @secure
	 */
	favoriteProductsList = (params: RequestParams = {}) =>
		this.request<FavoriteProduct[], any>({
			path: `/favorite-products/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for viewing useres' favorite products by admins.
	 *
	 * @tags favorite-products
	 * @name FavoriteProductsRead
	 * @request GET:/favorite-products/{id}/
	 * @secure
	 */
	favoriteProductsRead = (id: number, params: RequestParams = {}) =>
		this.request<FavoriteProduct, any>({
			path: `/favorite-products/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
}
