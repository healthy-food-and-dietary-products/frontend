import React, { useState, useCallback, useEffect } from 'react';
import { validationRules } from '@data/validationRules.ts';

type FormAndValidationHook = {
	values: Record<string, string | number>;
	setValues: React.Dispatch<React.SetStateAction<Record<string, string | number>>>;
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

export function useFormAndValidation(
	initialValues: Record<string, string | number> = {}
): FormAndValidationHook {
	const [values, setValues] = useState<Record<string, string | number>>(initialValues);
	const [errors, setErrors] = useState({});
	const [isValid, setIsValid] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });

		const fieldName = name.split('_').pop() || name;
		const validationRule = validationRules[fieldName] || {};

		const stringValues: { [key: string]: string } = {};
		Object.keys(values).forEach((key) => {
			stringValues[key] = String(values[key]);
		});

		const errorMessage = validationRule.validate
			? validationRule.validate(value, stringValues)
				? ''
				: validationRule.message
			: '';

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: errorMessage,
		}));

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
					console.log(value);
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
