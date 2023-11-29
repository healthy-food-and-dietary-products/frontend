import React, { ReactNode, useState } from 'react';
import { usePopup } from '@hooks/use-popup.ts';
import Popup from '@components/popup';
import styles from '@components/popups/popup-login/popup-login.module.scss';
import api from '@services/api.ts';
import Input from '@ui/input';
import { useFormAndValidation } from '@hooks/use-form-and-validation.ts';

const PopupRegistration: React.FC = () => {
	const { values, handleChange, validateInputsHandleSubmit, errors, isValid, resetForm } =
		useFormAndValidation();
	const { popupState, handleClosePopup, handleOpenPopup } = usePopup();
	const [disabledButton, setDisabledButton] = useState(false);

	function onSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setDisabledButton(true);
		const NameErrors = validateInputsHandleSubmit(
			'text',
			values.registration_name as string
		);
		const emailErrors = validateInputsHandleSubmit(
			'email',
			values.registration_email as string
		);
		const passwordErrors = validateInputsHandleSubmit(
			'password',
			values.registration_password as string
		);
		const errors = { ...NameErrors, ...emailErrors, ...passwordErrors };

		if (Object.keys(errors).length === 0) {
			api
				.usersCreate({
					email: `${values.registration_email}`,
					username: `${values.registration_name}`,
					password: `${values.registration_password}`,
				})
				.then(() => {
					handleClosePopup('openPopupRegistration');
					resetForm();
					handleOpenPopup('openPopupLogin');
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setDisabledButton(false));
		} else {
			console.log('Произошла ошибка валидации');
			console.log('Ошибки:', errors);

			setDisabledButton(false);
		}
	}

	async function openRegistrationPopup() {
		await handleClosePopup('openPopupRegistration');
		handleOpenPopup('openPopupLogin');
	}

	return (
		<Popup
			openPopup={popupState.openPopupRegistration}
			onClickClose={() => handleClosePopup('openPopupRegistration')}
			additionalClasses={styles['popupLogin']}
		>
			<div className={styles['popupLogin__container']}>
				<h2 className={styles['popupLogin__title']}>Регистрация</h2>
				<form className={styles['popupLogin__form']} noValidate onSubmit={onSubmitLogin}>
					<Input
						name="registration_firstName"
						id="registration_name-input"
						type="text"
						minLength={2}
						maxLength={40}
						placeholder="Имя пользователся"
						onChange={handleChange}
						value={values.registration_name}
						error={errors}
						isValid={isValid}
						inputNameSpan="Имя"
						required
					/>
					<Input
						name="registration_email"
						id="registration_email-input"
						type="email"
						minLength={2}
						maxLength={40}
						placeholder="E-mail"
						onChange={handleChange}
						value={values.registration_email}
						error={errors}
						isValid={isValid}
						inputNameSpan="Email (Почтовый адрес)"
						required
					/>
					<Input
						name="registration_password"
						id="registration-password-input"
						type="password"
						minLength={2}
						maxLength={40}
						placeholder="Пароль"
						onChange={handleChange}
						value={values.registration_password}
						error={errors}
						isValid={isValid}
						inputNameSpan="Пароль"
						required
					/>
					<Input
						name="registration_repeatPassword"
						id="registration_repeatPassword-input"
						type="password"
						minLength={2}
						maxLength={40}
						placeholder="Пароль повторно"
						onChange={handleChange}
						value={values.registration_repeatPassword}
						error={errors}
						isValid={isValid}
						inputNameSpan="Пароль повторно"
						required
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
					Есть аккаунт?{' '}
					<button
						className={styles['popupLogin__registration-button']}
						type="button"
						onClick={openRegistrationPopup}
					>
						{' '}
						Войти
					</button>
				</p>
			</div>
		</Popup>
	);
};

export default PopupRegistration;
