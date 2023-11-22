export const BACKEND_URL = 'https://goodfood.acceleratorpracticum.ru/api';

export const enterEmail = 'Введите свою почту';
export const enterPhone = 'Введите свой номер телефона';
export const enterCard = 'Введите номер своей карты';
export const enterPassword = 'Введите свой пароль';

export const emailError =
	'Почтовый адрес введен неверно, проверьте правильность написания';
export const nameError =
	'Имя введено неверно. Проверьте, что поле содержит только кириллицу и содержит от 2 до 30 символов.';
export const lastNameError =
	'Фамилия введена неверно. Проверьте, что поле содержит только кириллицу и содержит от 2 до 30 символов.';
export const usernameError =
	'Никнейм введен неверно. Проверьте, содержание, буквы только латиницей, знаки, символы без пробелов';

export const phoneError = 'Номер телефона введен неверно, повторите попытку';
export const cardError = 'Неверный номер карты';
export const passwordError = 'Пароль введен неверно, попробуйте еще раз ';

export const emailNotExist = 'Указанный почтовый адрес не существует, попробуйте еще раз';
export const passwordNotValid = 'Пароль: 8+ символов, заглавная и строчная буквы, цифры.';
export const passwordNotMatch = 'Пароль не соотвествует. Проверьте написание';

export const birthdayError = 'Введите дату в формате день.месяц.год (DD.MM.YYYY)';

export const URLS = {
	SIGNUP: '/signup',
	PROFILE: '/profile',
	CATALOG: '/catalog',
};

export const tests = {
	first_name: {
		message: nameError,
		regex: /^[а-яА-Я]{2,30}$/,
	},
	last_name: {
		message: lastNameError,
		regex: /^[а-яА-Я]{2,30}$/,
	},
	email: {
		message: emailError,
		regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	},
	phone_number: {
		message: phoneError,
		regex: /^\+(\+7|7|8)[0-9]{10}$/,
	},
	username: {
		message: usernameError,
		regex: /^[\w.@+-]+$/,
	},
	birth_date: {
		message: birthdayError,
		regex: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
	},
	password: {
		message: passwordNotValid,
		regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
	},
};
