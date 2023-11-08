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

import { Component } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Components<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for components.
	 *
	 * @tags components
	 * @name ComponentsList
	 * @request GET:/components/
	 * @secure
	 */
	componentsList = (params: RequestParams = {}) =>
		this.request<Component[], any>({
			path: `/components/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for components.
	 *
	 * @tags components
	 * @name ComponentsCreate
	 * @request POST:/components/
	 * @secure
	 */
	componentsCreate = (data: Component, params: RequestParams = {}) =>
		this.request<Component, any>({
			path: `/components/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for components.
	 *
	 * @tags components
	 * @name ComponentsRead
	 * @request GET:/components/{id}/
	 * @secure
	 */
	componentsRead = (id: number, params: RequestParams = {}) =>
		this.request<Component, any>({
			path: `/components/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for components.
	 *
	 * @tags components
	 * @name ComponentsPartialUpdate
	 * @request PATCH:/components/{id}/
	 * @secure
	 */
	componentsPartialUpdate = (id: number, data: Component, params: RequestParams = {}) =>
		this.request<Component, any>({
			path: `/components/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for components.
	 *
	 * @tags components
	 * @name ComponentsDelete
	 * @request DELETE:/components/{id}/
	 * @secure
	 */
	componentsDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/components/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
