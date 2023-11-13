import React, { ReactNode, useState } from 'react';
import Popup from '@components/popup';
import { usePopup } from '@hooks/use-popup.ts';
import Input from '@ui/input';
import styles from './popup-login.module.scss';
import { useFormAndValidation } from '@hooks/use-form-and-validation.ts';
import api from '@services/api.ts';
import Cookies from 'js-cookie';
import { useAuth } from '@hooks/use-auth.ts';

const PopupLogin: React.FC = () => {
	const { values, handleChange, validateInputsHandleSubmit, errors, isValid, resetForm } =
		useFormAndValidation();
	const { popupState, handleClosePopup, handleOpenPopup } = usePopup();
	const { checkAuthentication } = useAuth();
	const [disabledButton, setDisabledButton] = useState(false);

	function onSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setDisabledButton(true);
		const emailErrors = validateInputsHandleSubmit('email', values.login_email as string);
		const passwordErrors = validateInputsHandleSubmit(
			'password',
			values.login_password as string
		);
		const errors = { ...emailErrors, ...passwordErrors };

		if (Object.keys(errors).length === 0) {
			api
				.tokenLoginCreate({
					password: `${values.login_password}`,
					email: `${values.login_email}`,
				})
				.then((data) => {
					handleClosePopup('openPopupLogin');
					Cookies.set('token', data.auth_token, {
						expires: 14,
					});
					checkAuthentication();
					resetForm();
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setDisabledButton(false));
		} else {
			console.log('Произошла ошибка валидации');
			setDisabledButton(false);
		}
	}

	async function openRegistrationPopup() {
		await handleClosePopup('openPopupLogin');
		handleOpenPopup('openPopupRegistration');
	}

	return (
		<Popup
			openPopup={popupState.openPopupLogin}
			onClickClose={() => handleClosePopup('openPopupLogin')}
			additionalClasses={styles['popupLogin']}
		>
			<div className={styles['popupLogin__container']}>
				<h2 className={styles['popupLogin__title']}>Авторизация</h2>
				<form className={styles['popupLogin__form']} noValidate onSubmit={onSubmitLogin}>
					<Input
						name="login_email"
						id="login_email-input"
						type="email"
						minLength={2}
						maxLength={40}
						placeholder="E-mail"
						onChange={handleChange}
						value={values.login_email}
						error={errors}
						isValid={isValid}
						inputNameSpan="Email (Почтовый адрес)"
					/>
					<Input
						name="login_password"
						id="login-password-input"
						type="password"
						minLength={2}
						maxLength={40}
						placeholder="Пароль"
						onChange={handleChange}
						value={values.login_password}
						error={errors}
						isValid={isValid}
						inputNameSpan="Пароль"
					/>
					<p className={styles['popupLogin__error-message']}>
						{(Object.values(errors).find((error) => error) || '') as ReactNode}
					</p>
					<button
						className={`${styles['popupLogin__button']} ${
							!isValid ? `${styles['popupLogin__button_type_error']}` : ''
						}`}
						disabled={disabledButton}
						type="submit"
					>
						Войти
					</button>
				</form>
				<p className={styles['popupLogin__registration-prompt']}>
					Нет аккаунта?{' '}
					<button
						className={styles['popupLogin__registration-button']}
						type="button"
						onClick={openRegistrationPopup}
					>
						{' '}
						Зарегистрироваться
					</button>
				</p>
			</div>
		</Popup>
	);
};

export default PopupLogin;
