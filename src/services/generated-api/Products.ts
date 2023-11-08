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

import {
	FavoriteProductCreate,
	Product,
	ProductCreate,
	ProductUpdate,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Products<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for products.
	 *
	 * @tags products
	 * @name ProductsList
	 * @request GET:/products/
	 * @secure
	 */
	productsList = (
		query?: {
			/** name */
			name?: string;
			/** category */
			category?: string;
			/** subcategory */
			subcategory?: string;
			/** producer */
			producer?: string;
			/** components */
			components?: string;
			/** tags */
			tags?: string;
			/** promotions */
			promotions?: string;
			/** discontinued */
			discontinued?: string;
			/** is_favorited */
			is_favorited?: string;
			/** min_price */
			min_price?: string;
			/** max_price */
			max_price?: string;
			/** A page number within the paginated result set. */
			page?: number;
			/** Number of results to return per page. */
			limit?: number;
		},
		params: RequestParams = {}
	) =>
		this.request<
			{
				count: number;
				/** @format uri */
				next?: string | null;
				/** @format uri */
				previous?: string | null;
				results: Product[];
			},
			any
		>({
			path: `/products/`,
			method: 'GET',
			query: query,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for products.
	 *
	 * @tags products
	 * @name ProductsCreate
	 * @request POST:/products/
	 * @secure
	 */
	productsCreate = (data: ProductCreate, params: RequestParams = {}) =>
		this.request<ProductCreate, any>({
			path: `/products/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Increments the views_number field when someone views this product.
	 *
	 * @tags products
	 * @name ProductsRead
	 * @request GET:/products/{id}/
	 * @secure
	 */
	productsRead = (id: number, params: RequestParams = {}) =>
		this.request<Product, any>({
			path: `/products/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for products.
	 *
	 * @tags products
	 * @name ProductsPartialUpdate
	 * @request PATCH:/products/{id}/
	 * @secure
	 */
	productsPartialUpdate = (id: number, data: ProductUpdate, params: RequestParams = {}) =>
		this.request<ProductUpdate, any>({
			path: `/products/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for products.
	 *
	 * @tags products
	 * @name ProductsDelete
	 * @request DELETE:/products/{id}/
	 * @secure
	 */
	productsDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/products/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
	/**
	 * @description Viewset for products.
	 *
	 * @tags products
	 * @name ProductsFavoriteCreate
	 * @request POST:/products/{id}/favorite/
	 * @secure
	 */
	productsFavoriteCreate = (
		id: number,
		data: FavoriteProductCreate,
		params: RequestParams = {}
	) =>
		this.request<FavoriteProductCreate, any>({
			path: `/products/${id}/favorite/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for products.
	 *
	 * @tags products
	 * @name ProductsFavoriteDelete
	 * @request DELETE:/products/{id}/favorite/
	 * @secure
	 */
	productsFavoriteDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/products/${id}/favorite/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
