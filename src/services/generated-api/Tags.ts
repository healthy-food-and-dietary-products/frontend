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

import { Tag } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Tags<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Viewset for tags.
	 *
	 * @tags tags
	 * @name TagsList
	 * @request GET:/tags/
	 * @secure
	 */
	tagsList = (params: RequestParams = {}) =>
		this.request<Tag[], any>({
			path: `/tags/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for tags.
	 *
	 * @tags tags
	 * @name TagsCreate
	 * @request POST:/tags/
	 * @secure
	 */
	tagsCreate = (data: Tag, params: RequestParams = {}) =>
		this.request<Tag, any>({
			path: `/tags/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for tags.
	 *
	 * @tags tags
	 * @name TagsRead
	 * @request GET:/tags/{id}/
	 * @secure
	 */
	tagsRead = (id: number, params: RequestParams = {}) =>
		this.request<Tag, any>({
			path: `/tags/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for tags.
	 *
	 * @tags tags
	 * @name TagsPartialUpdate
	 * @request PATCH:/tags/{id}/
	 * @secure
	 */
	tagsPartialUpdate = (id: number, data: Tag, params: RequestParams = {}) =>
		this.request<Tag, any>({
			path: `/tags/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for tags.
	 *
	 * @tags tags
	 * @name TagsDelete
	 * @request DELETE:/tags/{id}/
	 * @secure
	 */
	tagsDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/tags/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
