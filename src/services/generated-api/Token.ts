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

import { TokenCreate } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Token<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Use this endpoint to obtain user authentication token.
	 *
	 * @tags token
	 * @name TokenLoginCreate
	 * @request POST:/token/login/
	 * @secure
	 */
	tokenLoginCreate = (data: TokenCreate, params: RequestParams = {}) =>
		this.request<TokenCreate, any>({
			path: `/token/login/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Use this endpoint to logout user (remove user authentication token).
	 *
	 * @tags token
	 * @name TokenLogoutCreate
	 * @request POST:/token/logout/
	 * @secure
	 */
	tokenLogoutCreate = (params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/token/logout/`,
			method: 'POST',
			secure: true,
			...params,
		});
}
