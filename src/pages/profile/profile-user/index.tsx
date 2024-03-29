import { useState, useMemo, useEffect } from 'react';
import Input from '@components/ui/input';
import styles from './profile-user.module.scss';
import clsx from 'clsx';
import { useFormAndValidation } from '@hooks/use-form-and-validation';
import { useProfile } from '@hooks/use-profile';
import { useAuth } from '@hooks/use-auth';
import ReturnBackButton from '@components/profile-components/return-back-button';
import api from '@services/api';
// import { usePopup } from '@hooks/use-popup';
// import PopupCheckEmail from '@components/popups/popup-check-email';

export default function ProfileUser() {
	const { updateUsers, user } = useAuth();
	const { isMobileScreen } = useProfile();
	const initialValues = useMemo(() => {
		const { email, first_name, last_name, phone_number, username, birth_date, city } =
			user;
		return {
			profile_email: email,
			profile_firstName: first_name,
			profile_lastName: last_name,
			profile_phoneNumber: phone_number,
			profile_username: username,
			profile_birthDate: birth_date,
			profile_city: city,
		} as Record<string, string | number>;
	}, [user]);

	// const { handleOpenPopup } = usePopup();
	const [disabledButton, setDisabledButton] = useState(false);
	const [updateMeError, setUpdateMeError] = useState('');
	const [updateMeSuccess, setUpdateMeSuccess] = useState('');

	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation(initialValues);

	useEffect(() => {
		setUpdateMeError('');
		setUpdateMeSuccess('');
	}, [values]);

	const isChangeValue = useMemo(
		() =>
			Object.entries(values).some((entry) => {
				if (initialValues[entry[0]] === null) {
					return Boolean(initialValues[entry[0]]) !== Boolean(entry[1]);
				}
				return initialValues[entry[0]] !== entry[1];
			}),
		[initialValues, values]
	);

	const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setDisabledButton(true);
		// handleOpenPopup('openPopupCheckEmail');

		api
			.usersMePartialUpdate({
				email: `${values.profile_email}`,
				username: `${values.profile_username}`,
				first_name: `${values.profile_firstName}`,
				last_name: `${values.profile_lastName}`,
				// city: `${values.profile_city}`,
				...(values.profile_birthDate !== null && {
					birth_date: `${values.profile_birthDate}`,
				}),
				phone_number: `${values.profile_phoneNumber}`,
			})
			.then((data) => {
				updateUsers(data);
				setUpdateMeSuccess('Данные успешно обновлены');
			})
			.catch((err) => {
				setUpdateMeError(err.errors[0].detail);
			})
			.finally(() => setDisabledButton(false));
	};

	return (
		<div className={styles.wrapper} style={{ position: 'relative' }}>
			<div className={styles.title}>
				<h2 className={styles.title__text}>Личные данные</h2>
				{isMobileScreen && <ReturnBackButton />}
			</div>
			<form className={styles.form} onSubmit={onSubmitForm}>
				<p className={clsx(styles.text, styles.text__red)}>
					* Обязательное поле для заполнения
				</p>
				<Input
					inputNameSpan="Имя"
					name="profile_firstName"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="first_name-input"
					type="text"
					value={values.profile_firstName}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan="Фамилия"
					name="profile_lastName"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="last_name-input"
					type="text"
					value={values.profile_lastName}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan={`Email* (Почтовый адрес)`}
					name="profile_email"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="email-input"
					type="email"
					value={values.profile_email}
					withErrorSpan={true}
					required
				/>
				<Input
					inputNameSpan={`Номер телефона`}
					name="profile_phoneNumber"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="phone_number-input"
					type="phone"
					value={values.profile_phoneNumber}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan="Username"
					name="profile_username"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="profile_username-input"
					type="text"
					value={values.profile_username}
					withErrorSpan={true}
					required
				/>
				<Input
					inputNameSpan="Дата рождения"
					name="profile_birthDate"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="birth_date-input"
					type="text"
					value={values.profile_birthDate || ''}
					withErrorSpan={true}
				/>
				{/* <Input
					inputNameSpan="Город"
					name="profile_city"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="city-input"
					type="text"
					value={values.profile_city}
					withErrorSpan={true}
					required
				/> */}
				<p
					className={clsx(styles.result, {
						[styles.success]: updateMeSuccess,
						[styles.error]: updateMeError,
					})}
				>
					{updateMeError ? updateMeError : updateMeSuccess}
				</p>
				<div className={styles.buttons}>
					<button
						className={styles.button__safe}
						type="submit"
						disabled={!isChangeValue || disabledButton || !isValid}
					>
						Сохранить
					</button>
					{(isChangeValue || disabledButton) && (
						<button
							className={styles.button__cancel}
							type="button"
							onClick={() => resetForm(initialValues)}
						>
							Отмена
						</button>
					)}
				</div>
			</form>
			{/* <PopupCheckEmail /> */}
		</div>
	);
}
