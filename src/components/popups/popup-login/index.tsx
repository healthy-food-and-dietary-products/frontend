import React, { useState } from 'react';
import { useFormAndValidation } from '@hooks/use-form-and-validation.ts';
import api from '@services/api.ts';
import Cookies from 'js-cookie';
import { useAuth } from '@hooks/use-auth.ts';
import { useNavigate } from 'react-router';
import { usePopup } from '@hooks/use-popup.ts';
import PopupLoginLayout from '@components/popups/popup-login/PopupLoginLayout.tsx';

const PopupLogin: React.FC = () => {
	const { values, handleChange, validateInputsHandleSubmit, errors, isValid, resetForm } =
		useFormAndValidation();
	const { checkAuthentication } = useAuth();
	const [disabledButton, setDisabledButton] = useState(false);
	const navigate = useNavigate();
	const { popupState, handleClosePopup, handleOpenPopup } = usePopup();

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
					Cookies.set('token', data.auth_token, {
						expires: 14,
					});
				})
				.then(() => checkAuthentication())
				.then(() => {
					handleClosePopup('openPopupLogin');
					resetForm();
					navigate('/profile');
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

	return (
		<PopupLoginLayout
			onSubmitLogin={onSubmitLogin}
			handleChange={handleChange}
			handleClosePopup={handleClosePopup}
			handleOpenPopup={handleOpenPopup}
			popupState={popupState}
			disabledButton={disabledButton}
			values={values}
			isValid={isValid}
			errors={errors}
		/>
	);
};

export default PopupLogin;
