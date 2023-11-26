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
	ErrorResponse401,
	Token,
	TokenCreate,
	ValidationErrorResponse,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Tokens<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Allows to obtain a user authentication token
	 *
	 * @tags token
	 * @name TokenLoginCreate
	 * @summary Obtain auth token
	 * @request POST:/token/login/
	 * @secure
	 */
	tokenLoginCreate = (data: TokenCreate, params: RequestParams = {}) =>
		this.request<Token, ValidationErrorResponse>({
			path: `/token/login/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Allows to remove a user authentication token
	 *
	 * @tags token
	 * @name TokenLogoutCreate
	 * @summary Remove auth token
	 * @request POST:/token/logout/
	 * @secure
	 */
	tokenLogoutCreate = (params: RequestParams = {}) =>
		this.request<void, ErrorResponse401>({
			path: `/token/logout/`,
			method: 'POST',
			secure: true,
			...params,
		});
}
