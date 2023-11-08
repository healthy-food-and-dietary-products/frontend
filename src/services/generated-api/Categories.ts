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

import { Category, CategoryCreate } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Categories<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for categories.
	 *
	 * @tags categories
	 * @name CategoriesList
	 * @request GET:/categories/
	 * @secure
	 */
	categoriesList = (params: RequestParams = {}) =>
		this.request<Category[], any>({
			path: `/categories/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for categories.
	 *
	 * @tags categories
	 * @name CategoriesCreate
	 * @request POST:/categories/
	 * @secure
	 */
	categoriesCreate = (data: CategoryCreate, params: RequestParams = {}) =>
		this.request<CategoryCreate, any>({
			path: `/categories/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for categories.
	 *
	 * @tags categories
	 * @name CategoriesRead
	 * @request GET:/categories/{id}/
	 * @secure
	 */
	categoriesRead = (id: number, params: RequestParams = {}) =>
		this.request<Category, any>({
			path: `/categories/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for categories.
	 *
	 * @tags categories
	 * @name CategoriesPartialUpdate
	 * @request PATCH:/categories/{id}/
	 * @secure
	 */
	categoriesPartialUpdate = (
		id: number,
		data: CategoryCreate,
		params: RequestParams = {}
	) =>
		this.request<CategoryCreate, any>({
			path: `/categories/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for categories.
	 *
	 * @tags categories
	 * @name CategoriesDelete
	 * @request DELETE:/categories/{id}/
	 * @secure
	 */
	categoriesDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/categories/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
