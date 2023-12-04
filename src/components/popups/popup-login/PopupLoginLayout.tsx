import React, { ReactNode } from 'react';
import Popup from '@components/popup';
import Input from '@ui/input';
import styles from './popup-login.module.scss';

type PopupLoginLayoutProps = {
	onSubmitLogin: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleOpenPopup: (popupName: string) => void;
	handleClosePopup: (popupName: string) => void;
	popupState: {
		openPopupLogin: boolean;
	};
	values: Record<string, string | number>;
	isValid: boolean;
	errors: Record<string, unknown>;
	disabledButton: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PopupLoginLayout: React.FC<PopupLoginLayoutProps> = (
	props: PopupLoginLayoutProps
) => {
	const {
		onSubmitLogin,
		handleChange,
		handleClosePopup,
		handleOpenPopup,
		popupState,
		values,
		isValid,
		errors,
		disabledButton,
	} = props;

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
						required
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
						required
					/>
					<p className={styles['popupLogin__error-message']}>
						{(Object.values(errors).find((error) => error) || '') as ReactNode}
					</p>
					<p className={styles['popupLogin__forgot']}>Забили пароль?</p>
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

export default PopupLoginLayout;
