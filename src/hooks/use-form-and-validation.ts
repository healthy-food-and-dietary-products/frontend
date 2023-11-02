import React, { useState, useCallback, useEffect } from 'react';

type FormAndValidationHook = {
	values: Record<string, unknown>;
	setValues: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
	errors: Record<string, unknown>;
	setErrors: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
	isValid: boolean;
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validateInputsHandleSubmit: (type: string, value: string) => Record<string, string>;
	resetForm: (
		newValues?: Record<string, unknown>,
		newErrors?: Record<string, unknown>,
		newIsValid?: boolean
	) => void;
};

export function useFormAndValidation(): FormAndValidationHook {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;

		setValues({ ...values, [name]: value });

		if (type === 'email') {
			const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: isValidEmail ? '' : 'Введите корректный email',
			}));
		} else if (type === 'password') {
			const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
				value
			);
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: isValidPassword
					? ''
					: 'Пароль: 8+ символов, заглавная и строчная буквы, цифры.',
			}));
		} else {
			setErrors({ ...errors, [name]: e.target.validationMessage });
		}

		const form = e.target.closest('form');
		const formInputs = form ? form.querySelectorAll('input') : [];
		if (formInputs) {
			const isFormValid = Array.from(formInputs).every((input) => input.checkValidity());
			setIsValid(isFormValid);
		}
	};

	function validateInputsHandleSubmit(type: string, value: string) {
		const errors: Record<string, string> = {};
		const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
		const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
			value
		);

		switch (type) {
			case 'text':
				if (!value || value.trim() === '') {
					errors[type] = 'Это поле обязательно для заполнения';
				} else if (value.trim().length < 2 || value.trim().length > 30) {
					errors[type] = 'Имя должно быть не короче 2 символов и не длиннее 30 символов';
				}
				break;
			case 'email':
				if (!isValidEmail) {
					errors[type] = 'Введите корректный email';
				}
				break;
			case 'password':
				if (!isValidPassword) {
					errors[type] = 'Пароль: 8+ символов, заглавная и строчная буквы, цифры.';
				}
				break;
			default:
				break;
		}

		return errors;
	}

	useEffect(() => {
		const hasErrors = Object.values(errors).some((error) => error !== '');
		if (isValid && !hasErrors) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [errors, isValid]);

	const resetForm = useCallback(
		(newValues = {}, newErrors = {}, newIsValid = false) => {
			setValues(newValues);
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		[setValues, setErrors, setIsValid]
	);

	return {
		values,
		setValues,
		errors,
		setErrors,
		isValid,
		setIsValid,
		handleChange,
		validateInputsHandleSubmit,
		resetForm,
	};
}
