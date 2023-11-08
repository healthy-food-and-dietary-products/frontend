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

import { Subcategory } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Subcategories<
	SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for subcategories.
	 *
	 * @tags subcategories
	 * @name SubcategoriesList
	 * @request GET:/subcategories/
	 * @secure
	 */
	subcategoriesList = (params: RequestParams = {}) =>
		this.request<Subcategory[], any>({
			path: `/subcategories/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for subcategories.
	 *
	 * @tags subcategories
	 * @name SubcategoriesCreate
	 * @request POST:/subcategories/
	 * @secure
	 */
	subcategoriesCreate = (data: Subcategory, params: RequestParams = {}) =>
		this.request<Subcategory, any>({
			path: `/subcategories/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for subcategories.
	 *
	 * @tags subcategories
	 * @name SubcategoriesRead
	 * @request GET:/subcategories/{id}/
	 * @secure
	 */
	subcategoriesRead = (id: number, params: RequestParams = {}) =>
		this.request<Subcategory, any>({
			path: `/subcategories/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for subcategories.
	 *
	 * @tags subcategories
	 * @name SubcategoriesPartialUpdate
	 * @request PATCH:/subcategories/{id}/
	 * @secure
	 */
	subcategoriesPartialUpdate = (
		id: number,
		data: Subcategory,
		params: RequestParams = {}
	) =>
		this.request<Subcategory, any>({
			path: `/subcategories/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for subcategories.
	 *
	 * @tags subcategories
	 * @name SubcategoriesDelete
	 * @request DELETE:/subcategories/{id}/
	 * @secure
	 */
	subcategoriesDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/subcategories/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
