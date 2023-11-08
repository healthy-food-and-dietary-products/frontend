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
	Activation,
	Address,
	OrderList,
	OrderPostDelete,
	PasswordResetConfirm,
	SendEmailReset,
	SetPassword,
	SetUsername,
	ShoppingCartGet,
	ShoppingCartPostUpdateDelete,
	User,
	UserCreate,
	UsernameResetConfirm,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersList
	 * @request GET:/users/
	 * @secure
	 */
	usersList = (params: RequestParams = {}) =>
		this.request<User[], any>({
			path: `/users/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersCreate
	 * @request POST:/users/
	 * @secure
	 */
	usersCreate = (data: UserCreate, params: RequestParams = {}) =>
		this.request<UserCreate, any>({
			path: `/users/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersActivation
	 * @request POST:/users/activation/
	 * @secure
	 */
	usersActivation = (data: Activation, params: RequestParams = {}) =>
		this.request<Activation, any>({
			path: `/users/activation/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersMeRead
	 * @request GET:/users/me/
	 * @secure
	 */
	usersMeRead = (params: RequestParams = {}) =>
		this.request<User[], any>({
			path: `/users/me/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersMeUpdate
	 * @request PUT:/users/me/
	 * @secure
	 */
	usersMeUpdate = (data: User, params: RequestParams = {}) =>
		this.request<User, any>({
			path: `/users/me/`,
			method: 'PUT',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersMePartialUpdate
	 * @request PATCH:/users/me/
	 * @secure
	 */
	usersMePartialUpdate = (data: User, params: RequestParams = {}) =>
		this.request<User, any>({
			path: `/users/me/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersMeDelete
	 * @request DELETE:/users/me/
	 * @secure
	 */
	usersMeDelete = (params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/users/me/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersResendActivation
	 * @request POST:/users/resend_activation/
	 * @secure
	 */
	usersResendActivation = (data: SendEmailReset, params: RequestParams = {}) =>
		this.request<SendEmailReset, any>({
			path: `/users/resend_activation/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersResetPassword
	 * @request POST:/users/reset_password/
	 * @secure
	 */
	usersResetPassword = (data: SendEmailReset, params: RequestParams = {}) =>
		this.request<SendEmailReset, any>({
			path: `/users/reset_password/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersResetPasswordConfirm
	 * @request POST:/users/reset_password_confirm/
	 * @secure
	 */
	usersResetPasswordConfirm = (data: PasswordResetConfirm, params: RequestParams = {}) =>
		this.request<PasswordResetConfirm, any>({
			path: `/users/reset_password_confirm/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersResetUsername
	 * @request POST:/users/reset_username/
	 * @secure
	 */
	usersResetUsername = (data: SendEmailReset, params: RequestParams = {}) =>
		this.request<SendEmailReset, any>({
			path: `/users/reset_username/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersResetUsernameConfirm
	 * @request POST:/users/reset_username_confirm/
	 * @secure
	 */
	usersResetUsernameConfirm = (data: UsernameResetConfirm, params: RequestParams = {}) =>
		this.request<UsernameResetConfirm, any>({
			path: `/users/reset_username_confirm/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersSetPassword
	 * @request POST:/users/set_password/
	 * @secure
	 */
	usersSetPassword = (data: SetPassword, params: RequestParams = {}) =>
		this.request<SetPassword, any>({
			path: `/users/set_password/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersSetUsername
	 * @request POST:/users/set_username/
	 * @secure
	 */
	usersSetUsername = (data: SetUsername, params: RequestParams = {}) =>
		this.request<SetUsername, any>({
			path: `/users/set_username/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersRead
	 * @request GET:/users/{id}/
	 * @secure
	 */
	usersRead = (id: number, params: RequestParams = {}) =>
		this.request<User, any>({
			path: `/users/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersUpdate
	 * @request PUT:/users/{id}/
	 * @secure
	 */
	usersUpdate = (id: number, data: User, params: RequestParams = {}) =>
		this.request<User, any>({
			path: `/users/${id}/`,
			method: 'PUT',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersPartialUpdate
	 * @request PATCH:/users/{id}/
	 * @secure
	 */
	usersPartialUpdate = (id: number, data: User, params: RequestParams = {}) =>
		this.request<User, any>({
			path: `/users/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Overrides DjoserUserViewSet serializer to delete a user without password.
	 *
	 * @tags users
	 * @name UsersDelete
	 * @request DELETE:/users/{id}/
	 * @secure
	 */
	usersDelete = (id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/users/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
	/**
	 * @description Viewset for addresses.
	 *
	 * @tags users
	 * @name UsersAddressesList
	 * @request GET:/users/{user_id}/addresses/
	 * @secure
	 */
	usersAddressesList = (userId: string, params: RequestParams = {}) =>
		this.request<Address[], any>({
			path: `/users/${userId}/addresses/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for addresses.
	 *
	 * @tags users
	 * @name UsersAddressesRead
	 * @request GET:/users/{user_id}/addresses/{id}/
	 * @secure
	 */
	usersAddressesRead = (userId: string, id: string, params: RequestParams = {}) =>
		this.request<Address, any>({
			path: `/users/${userId}/addresses/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for Order.
	 *
	 * @tags users
	 * @name UsersOrderList
	 * @request GET:/users/{user_id}/order/
	 * @secure
	 */
	usersOrderList = (userId: string, params: RequestParams = {}) =>
		this.request<OrderList[], any>({
			path: `/users/${userId}/order/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for Order.
	 *
	 * @tags users
	 * @name UsersOrderCreate
	 * @request POST:/users/{user_id}/order/
	 * @secure
	 */
	usersOrderCreate = (
		userId: string,
		data: OrderPostDelete,
		params: RequestParams = {}
	) =>
		this.request<OrderPostDelete, any>({
			path: `/users/${userId}/order/`,
			method: 'POST',
			body: data,
			secure: true,
			type: ContentType.Json,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for Order.
	 *
	 * @tags users
	 * @name UsersOrderRead
	 * @request GET:/users/{user_id}/order/{id}/
	 * @secure
	 */
	usersOrderRead = (userId: string, id: number, params: RequestParams = {}) =>
		this.request<OrderList, any>({
			path: `/users/${userId}/order/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for Order.
	 *
	 * @tags users
	 * @name UsersOrderDelete
	 * @request DELETE:/users/{user_id}/order/{id}/
	 * @secure
	 */
	usersOrderDelete = (userId: string, id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/users/${userId}/order/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
	/**
	 * @description Viewset for ShoppingCart.
	 *
	 * @tags users
	 * @name UsersShoppingCartList
	 * @request GET:/users/{user_id}/shopping_cart/
	 * @secure
	 */
	usersShoppingCartList = (userId: string, params: RequestParams = {}) =>
		this.request<ShoppingCartGet[], any>({
			path: `/users/${userId}/shopping_cart/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for ShoppingCart.
	 *
	 * @tags users
	 * @name UsersShoppingCartCreate
	 * @request POST:/users/{user_id}/shopping_cart/
	 * @secure
	 */
	usersShoppingCartCreate = (
		userId: string,
		data: ShoppingCartPostUpdateDelete,
		params: RequestParams = {}
	) =>
		this.request<ShoppingCartPostUpdateDelete, any>({
			path: `/users/${userId}/shopping_cart/`,
			method: 'POST',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for ShoppingCart.
	 *
	 * @tags users
	 * @name UsersShoppingCartRead
	 * @request GET:/users/{user_id}/shopping_cart/{id}/
	 * @secure
	 */
	usersShoppingCartRead = (userId: string, id: number, params: RequestParams = {}) =>
		this.request<ShoppingCartGet, any>({
			path: `/users/${userId}/shopping_cart/${id}/`,
			method: 'GET',
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for ShoppingCart.
	 *
	 * @tags users
	 * @name UsersShoppingCartPartialUpdate
	 * @request PATCH:/users/{user_id}/shopping_cart/{id}/
	 * @secure
	 */
	usersShoppingCartPartialUpdate = (
		userId: string,
		id: number,
		data: ShoppingCartPostUpdateDelete,
		params: RequestParams = {}
	) =>
		this.request<ShoppingCartPostUpdateDelete, any>({
			path: `/users/${userId}/shopping_cart/${id}/`,
			method: 'PATCH',
			body: data,
			secure: true,
			format: 'json',
			...params,
		});
	/**
	 * @description Viewset for ShoppingCart.
	 *
	 * @tags users
	 * @name UsersShoppingCartDelete
	 * @request DELETE:/users/{user_id}/shopping_cart/{id}/
	 * @secure
	 */
	usersShoppingCartDelete = (userId: string, id: number, params: RequestParams = {}) =>
		this.request<void, any>({
			path: `/users/${userId}/shopping_cart/${id}/`,
			method: 'DELETE',
			secure: true,
			...params,
		});
}
