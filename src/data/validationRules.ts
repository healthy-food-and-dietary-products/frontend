import {
	birthdayError,
	emailError,
	lastNameError,
	nameError,
	passwordNotRepeat,
	passwordNotValid,
	phoneError,
	usernameError,
} from '@data/errorMessages.ts';

type ValidationRules = {
	[key: string]: {
		message: string;
		validate: (
			value: string,
			allValues: { [key: string]: string }
		) => boolean | string | undefined;
	};
};

export const validationRules: ValidationRules = {
	firstName: {
		message: nameError,
		validate: (value: string) => /^[а-яА-Я]{2,30}$/.test(value),
	},
	lastName: {
		message: lastNameError,
		validate: (value: string) => /^[а-яА-Я]{2,30}$/.test(value),
	},
	email: {
		message: emailError,
		validate: (value: string) =>
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
	},
	phoneNumber: {
		message: phoneError,
		validate: (value: string) => /^\+(\+7|7|8)[0-9]{10}$/.test(value),
	},
	username: {
		message: usernameError,
		validate: (value: string) => /^[\w.@+-]+$/.test(value),
	},
	birthDate: {
		message: birthdayError,
		validate: (value: string) => /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/.test(value),
	},
	password: {
		message: passwordNotValid,
		validate: (value: string) =>
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value),
	},
	repeatPassword: {
		message: passwordNotRepeat,
		validate: (value: string, allValues: { [key: string]: string }) => {
			const passwordField = Object.keys(allValues).find((key) =>
				key.endsWith('password')
			);
			return passwordField && value === allValues[passwordField];
		},
	},
};
