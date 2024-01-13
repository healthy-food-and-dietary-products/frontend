export const BACKEND_URL = 'https://goodfood.acceleratorpracticum.ru/api';
export const BASE_URL = 'https://goodfood.acceleratorpracticum.ru';

export const URLS = {
	SIGNUP: '/signup',
	PROFILE: '/profile',
	CATALOG: '/catalog',
	AGREEMENT: '/agreement',
	DELIVERY_COND: '/delivery-conditions',
	DELIVERY: '/delivery',
	ABOUT_US: '/about-us',
	PAYMENT: '/payment',
	SUPPORT: '/support',
	CART_SUCCESS: '/cart/success',
	PROFILE_ORDERS: '/profile/orders/',
};

export const pickupPointAddresses = {
	1: 'Санкт-Петербург Невский проспект 17',
	2: 'Санкт-Петербург Горохова улица 10',
	3: 'Санкт-Петербург Невский проспект 89',
	4: 'Санкт-Петербург Большой Самсониевский 6',
	5: 'Санкт-Петербург Лесной проспект 56',
	6: 'Санкт-Петербург Владимирский проспект 1',
	7: 'Санкт-Петербург Лиговский проспект 170',
};

export const popupInfoText = {
	fillNameAuth: 'Пожалуйста, заполните имя в личном кабинете',
	fillSurnameAuth: 'Пожалуйста, заполните фамилию в личном кабинете',
	fillPhoneAuth: 'Пожалуйста, заполните номер телефона в личном кабинете',
	chooseAddress: 'Пожалуйста, выберите адрес',
	chooseOrFillAddress:
		'Пожалуйста, выберите адрес (добавить адрес можно в личном кабинете)',
	choosePaymentMethod: 'Пожалуйста, выберите способ оплаты',
	enterSurname: 'Пожалуйста, заполните фамилию',
	enterName: 'Пожалуйста, заполните имя',
	enterPhone: 'Пожалуйста, заполните номер телефона',
	enterEmail: 'Пожалуйста, заполните e-mail',
	enterAddress: 'Пожалуйста, введите адрес',
	errorShort: 'Ошибка при создании заказа: ',
	errorLong: 'Ошибка при создании заказа: ',
	selectAgreement:
		'Для оформления заказа необходимо согласие с условиями обработки персональных данных и условиями продажи.',
};

export const textIfOrderPaid =
	'Пока вы ждёте заказ, можете ознакомиться с рецептами из нашего блога';
export const textIfOrderNotPaid =
	'Пока решается проблема с оплатой, вы можете ознакомиться с рецептами из нашего блога';
