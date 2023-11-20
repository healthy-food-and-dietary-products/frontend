import Input from '@components/ui/input';
import styles from './profile-user.module.scss';
import clsx from 'clsx';
import { useFormAndValidation } from '@hooks/use-form-and-validation';
import { useAuth } from '@hooks/use-auth';
import { useState, useMemo } from 'react';
import api from '@services/api';
// import { usePopup } from '@hooks/use-popup';
// import PopupCheckEmail from '@components/popups/popup-check-email';

export default function ProfileUser() {
	const { updateUsers, user } = useAuth();
	const initialValues = useMemo(() => {
		const { email, first_name, last_name, phone_number, username, birth_date, city } =
			user;
		return {
			email,
			first_name,
			last_name,
			phone_number,
			username,
			birth_date,
			city,
		} as Record<string, string | number>;
	}, [user]);

	// const { handleOpenPopup } = usePopup();
	const [disabledButton, setDisabledButton] = useState(false);

	const { values, handleChange, errors, isValid, resetForm } =
		useFormAndValidation(initialValues);

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
				email: `${values.email}`,
				username: `${values.username}`,
				first_name: `${values.first_name}`,
				last_name: `${values.last_name}`,
				// city: `${values.city}`,
				birth_date: values.birth_date === '' ? null : `${values.birth_date}`,
				phone_number: `${values.phone_number}`,
			})
			.then((data) => {
				updateUsers(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setDisabledButton(false));
	};

	return (
		<div className={styles.wrapper} style={{ position: 'relative' }}>
			<h2 className={styles.title}>Личные данные</h2>
			<form className={styles.form} onSubmit={onSubmitForm}>
				<p className={clsx(styles.text, styles.text__red)}>
					* Обязательное поле для заполнения
				</p>
				<Input
					inputNameSpan="Имя"
					name="first_name"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="first_name-input"
					type="text"
					value={values.first_name}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan="Фамилия"
					name="last_name"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="last_name-input"
					type="text"
					value={values.last_name}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan={`Email* (Почтовый адрес)`}
					name="email"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="email-input"
					type="email"
					value={values.email}
					withErrorSpan={true}
					required
				/>
				<Input
					inputNameSpan={`Номер телефона`}
					name="phone_number"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="phone_number-input"
					type="phone"
					value={values.phone_number}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan="Username"
					name="username"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="username-input"
					type="text"
					value={values.username}
					withErrorSpan={true}
				/>
				<Input
					inputNameSpan="Дата рождения"
					name="birth_date"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="birth_date-input"
					type="text"
					value={values.birth_date || ''}
					withErrorSpan={true}
				/>
				{/* <Input
					inputNameSpan="Город"
					name="city"
					error={errors}
					onChange={handleChange}
					isValid={isValid}
					id="city-input"
					type="text"
					value={values.city}
					withErrorSpan={true}
				/> */}
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
