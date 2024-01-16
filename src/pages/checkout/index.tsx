import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import PopupCheckoutResponse from '@components/popups/popup-checkout-response';
import Breadcrumbs from '@components/breadcrumbs';
import Input from '@ui/input';

import api from '@services/api.ts';
import { pickupPointAddresses, URLS, popupInfoText } from '@data/constants';
import { useFormAndValidation } from '@hooks/use-form-and-validation.ts';
import { usePopup } from '@hooks/use-popup';
import { useAuth } from '@hooks/use-auth.ts';
import { useCart } from '@hooks/use-cart-context.ts';
import type { OrderPostAdd } from '@services/generated-api/data-contracts.ts';
import styles from './checkout.module.scss';

type Address = {
	id: number;
	address: string;
};

enum deliveryTypeEnum {
	pointOfDelivery = 'Point of delivery',
	byCourier = 'By courier',
}

enum paymentMethodEnum {
	pointOfDelivery = 'Payment at the point of delivery',
	onDelivery = 'In getting by cash',
	online = 'Online',
}

const Checkout: React.FC = () => {
	const { isLoggedIn, user } = useAuth();
	const { loadCartData, cartData } = useCart();
	const { handleOpenPopup, handleClosePopup } = usePopup();
	const location = useLocation();
	const receivedType = location.state?.orderType;
	const deliveryType = receivedType || deliveryTypeEnum.pointOfDelivery;
	const { values, handleChange, errors, isValid } = useFormAndValidation();
	const navigate = useNavigate();
	const [selectedPayment, setSelectedPayment] = React.useState<string>('');
	const [selectedTime, setSelectedTime] = React.useState<string>('');
	const [selectedAddress, setSelectedAddress] = React.useState<string>('');
	const userAddresses = user?.addresses as unknown[] as Address[];
	const [comment, setComment] = React.useState<string>('');
	const [popupText, setPopupText] = useState('');
	const [isAgreed, setIsAgreed] = useState(false);
	const [promocodeError, setPromocodeError] = useState('');
	const [inputPromoValue, setInputPromoValue] = useState('');

	const openInfoPopup = (text: string) => {
		setPopupText(text);
		handleOpenPopup('openPopupCheckoutResponse');
	};

	const validateOrderData = () => {
		switch (true) {
			case isLoggedIn && !user.first_name:
				return openInfoPopup(popupInfoText.fillNameAuth);
			case isLoggedIn && !user.last_name:
				return openInfoPopup(popupInfoText.fillSurnameAuth);
			case isLoggedIn && !user.phone_number:
				return openInfoPopup(popupInfoText.fillPhoneAuth);
			case isLoggedIn &&
				deliveryType === deliveryTypeEnum.pointOfDelivery &&
				!selectedAddress?.toString().trim():
				return openInfoPopup(popupInfoText.chooseAddress);
			case isLoggedIn && !selectedAddress?.toString().trim():
				return openInfoPopup(popupInfoText.chooseOrFillAddress);
			case isLoggedIn && !selectedPayment:
				return openInfoPopup(popupInfoText.choosePaymentMethod);
			case !isLoggedIn && !values.order_firstName?.toString().trim():
				return openInfoPopup(popupInfoText.enterName);
			case !isLoggedIn && !values.order_lastName?.toString().trim():
				return openInfoPopup(popupInfoText.enterSurname);
			case !isLoggedIn && !values.order_phoneNumber?.toString().trim():
				return openInfoPopup(popupInfoText.enterPhone);
			case !isLoggedIn && !values.order_email?.toString().trim():
				return openInfoPopup(popupInfoText.enterEmail);
			case !isLoggedIn &&
				deliveryType === deliveryTypeEnum.pointOfDelivery &&
				!selectedAddress?.toString().trim():
				return openInfoPopup(popupInfoText.chooseAddress);
			case !isLoggedIn && !selectedAddress?.toString().trim():
				return openInfoPopup(popupInfoText.enterAddress);
			case !isLoggedIn && !selectedPayment:
				return openInfoPopup(popupInfoText.choosePaymentMethod);
			case !isAgreed:
				return openInfoPopup(popupInfoText.selectAgreement);
			default:
				return true;
		}
	};

	const handleSubmitOrder = () => {
		if (!validateOrderData()) return;

		let formData: OrderPostAdd = {
			user_data: {
				first_name: values.order_firstName?.toString() || '',
				last_name: values.order_lastName?.toString() || '',
				phone_number: values.order_phoneNumber?.toString() || '',
				email: values.order_email?.toString() || '',
			},
			payment_method: selectedPayment as
				| paymentMethodEnum.pointOfDelivery
				| paymentMethodEnum.onDelivery
				| paymentMethodEnum.online,
			delivery_method: deliveryType as
				| deliveryTypeEnum.pointOfDelivery
				| deliveryTypeEnum.byCourier,
			delivery_point:
				deliveryType === deliveryTypeEnum.pointOfDelivery
					? Number(selectedAddress)
					: null,
			package: 0,
			comment: comment,
			add_address: selectedAddress || '',
		};

		deliveryType === deliveryTypeEnum.byCourier && delete formData.delivery_point;
		isLoggedIn && delete formData.user_data;

		if (isLoggedIn && deliveryType === deliveryTypeEnum.byCourier) {
			delete formData.add_address;
			formData = { ...formData, address: parseInt(selectedAddress, 10) };
		}

		api
			.usersOrderCreate(formData)
			.then((res) => {
				navigate(URLS.CART_SUCCESS, {
					state: { orderNumber: res.order_number, orderId: res.id },
				});
				loadCartData();
			})
			.catch((error) => {
				if (error.errors[0].detail) {
					openInfoPopup(popupInfoText.errorShort + error.errors[0].detail);
				} else {
					openInfoPopup(popupInfoText.errorLong);
				}
			});
	};

	const handleDiscount = (e: React.MouseEvent<HTMLButtonElement>) => {
		api
			.usersShoppingCartCouponApply({ code: inputPromoValue })
			.then(() => {
				setPromocodeError('');
				loadCartData();
			})
			.catch((error) => {
				setPromocodeError(error.errors[0].detail);
				loadCartData();
			});
		e.preventDefault();
	};

	const handleInputPromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputPromoValue(e.target.value);
	};

	const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedPayment(event.target.value);
	};

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedTime(event.target.value);
	};

	const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(event.target.value);
	};

	const handleAddressChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setSelectedAddress(event.target.value);
	};

	const handleClose = () => {
		handleClosePopup('openPopupCheckoutResponse');
		setPopupText('');
	};

	const handleAgreementChange = () => {
		setIsAgreed(!isAgreed);
	};

	return (
		<section className={styles.order}>
			<Breadcrumbs />
			<div className={styles.details}>
				<div className={styles.execution}>
					<h2 className={styles.execution__title_mob}>Оформление заказа</h2>
					<form
						className={`${styles.execution__form} text-m`}
						onSubmit={handleSubmitOrder}
					>
						{!isLoggedIn && (
							<label className={styles.execution__contacts}>
								Контактные данные
								<div className={styles.execution__inputs}>
									<div className={styles.execution__input_label}>
										<Input
											name="order_firstName"
											id="order_first_name-input"
											type="text"
											minLength={2}
											maxLength={40}
											placeholder="Имя"
											onChange={handleChange}
											value={values.order_firstName}
											error={errors}
											isValid={isValid}
											inputNameSpan="Имя"
											withErrorSpan={true}
											required
										/>
									</div>
									<div className={styles.execution__input_label}>
										<Input
											name="order_lastName"
											id="order_last_name-input"
											type="text"
											minLength={2}
											maxLength={40}
											placeholder="Фамилия"
											onChange={handleChange}
											value={values.order_lastName}
											error={errors}
											isValid={isValid}
											inputNameSpan="Фамилия"
											withErrorSpan={true}
											required
										/>
									</div>
								</div>
								<div className={styles.execution__inputs}>
									<div className={styles.execution__input_label}>
										<Input
											name="order_phoneNumber"
											id="order_phone-input"
											type="text"
											minLength={2}
											maxLength={40}
											placeholder="Телефон"
											onChange={handleChange}
											value={values.order_phoneNumber}
											error={errors}
											isValid={isValid}
											inputNameSpan="Телефон"
											withErrorSpan={true}
											required
										/>
									</div>
									<div className={styles.execution__input_label}>
										<Input
											name="order_email"
											id="order_email-input"
											type="email"
											minLength={2}
											maxLength={40}
											placeholder="email"
											onChange={handleChange}
											value={values.order_email}
											error={errors}
											isValid={isValid}
											inputNameSpan="email"
											withErrorSpan={true}
											required
										/>
									</div>
								</div>
							</label>
						)}

						<label className={styles.execution__address}>
							{deliveryType !== deliveryTypeEnum.byCourier ? (
								<>
									Адрес пункта самовывоза
									{selectedAddress !== null ? (
										<select
											className={styles.execution__combobox}
											value={selectedAddress}
											onChange={handleAddressChange}
										>
											<option value="" className={styles.order__address_option}>
												Выберите адрес
											</option>
											{Object.entries(pickupPointAddresses).map(([id, address]) => (
												<option
													key={id}
													value={id}
													className={styles.order__address_option}
												>
													{address}
												</option>
											))}
										</select>
									) : (
										<input
											type="text"
											placeholder="Введите адрес"
											value={selectedAddress}
											onChange={handleAddressChange}
											className={styles.execution__input}
										/>
									)}
								</>
							) : (
								<>
									{isLoggedIn ? (
										<>
											Адрес доставки
											<select
												className={styles.execution__combobox}
												value={selectedAddress}
												onChange={handleAddressChange}
											>
												<option value="" className={styles.order__address_option}>
													Выберите адрес
												</option>
												{userAddresses.map((addr) => (
													<option
														key={addr.id}
														value={addr.id}
														className={styles.order__address_option}
													>
														{addr.address}
													</option>
												))}
											</select>
										</>
									) : (
										<>
											<span>Введите адрес доставки:</span>
											<input
												type="text"
												placeholder="Введите адрес"
												value={selectedAddress || ''}
												onChange={handleAddressChange}
												className={styles.execution__input}
											/>
										</>
									)}
								</>
							)}
						</label>

						<label className={styles.execution__delivery}>
							<div className={styles.execution__container}>
								<p className="text-m">Доставка</p>
								<select className={styles.execution__date}>
									<option value="today">сегодня</option>
									<option value="tomorrow">завтра</option>
								</select>
							</div>

							<div className={`${styles.execution__tab} ${styles.execution__tab_time}`}>
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="time"
										value="9.00-12.00"
										id="time_early-morning"
										onChange={handleTimeChange}
										checked={selectedTime === '9.00-12.00'}
									/>
									<label htmlFor="time_early-morning">9.00-12.00</label>
								</div>
								<hr className={styles.pricelist__divider} />
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="time"
										value="12.00-15.00"
										id="time_lunch"
										onChange={handleTimeChange}
										checked={selectedTime === '12.00-15.00'}
									/>
									<label htmlFor="time_lunch">12.00-15.00</label>
								</div>
								<hr className={styles.pricelist__divider} />
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="time"
										value="15.00-18.00"
										id="time_day"
										onChange={handleTimeChange}
										checked={selectedTime === '15.00-18.00'}
									/>
									<label htmlFor="time_day">15.00-18.00</label>
								</div>
								<hr className={styles.pricelist__divider} />
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="time"
										value="18.00-21.00"
										id="time_evening"
										onChange={handleTimeChange}
										checked={selectedTime === '18.00-21.00'}
									/>
									<label htmlFor="time_evening">18.00-21.00</label>
								</div>
							</div>
						</label>

						<label className={styles.execution__address}>
							Способ оплаты
							<div className={styles.execution__tab}>
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="payment"
										value="Online"
										id="payment_online"
										onChange={handlePaymentChange}
									/>
									<label htmlFor="payment_online">Оплата онлайн</label>
								</div>
								<hr className={styles.pricelist__divider} />
								{deliveryType === deliveryTypeEnum.byCourier && (
									<div className={styles.execution__item}>
										<input
											type="radio"
											name="payment"
											value="In getting by cash"
											id="payment_cash"
											onChange={handlePaymentChange}
										/>
										<label htmlFor="payment_cash">Оплата курьеру</label>
									</div>
								)}
								{deliveryType === deliveryTypeEnum.pointOfDelivery && (
									<div className={styles.execution__item}>
										<input
											type="radio"
											name="payment"
											value="Payment at the point of delivery"
											id="payment_offline"
											onChange={handlePaymentChange}
										/>
										<label htmlFor="payment_offline">Оплата в пункте выдачи</label>
									</div>
								)}
							</div>
						</label>
						<label className={styles.execution__address}>
							Комментарий
							<textarea
								className={styles.execution__comment}
								maxLength={200}
								value={comment}
								onChange={handleCommentChange}
							></textarea>
						</label>
					</form>
				</div>
				<div className={styles.summary}>
					<div className={styles.summary__prices}>
						<h3 className={`text_type_u ${styles.summary__title}`}>Общая стоимость</h3>
						<div className={styles.pricelist}>
							<div className={styles.pricelist__item}>
								<p className={`text_type_u ${styles.summary__title}`}>Товары</p>
								<p
									className={`text_type_u ${styles.pricelist__price}`}
								>{`${cartData.total_price} руб.`}</p>
							</div>
							<div className={styles.pricelist__item}>
								<p className={`text_type_u ${styles.summary__title}`}>Упаковка</p>
								<p className={`text_type_u ${styles.pricelist__price}`}>0 руб.</p>
							</div>
							<div className={styles.pricelist__item}>
								<p className={styles.pricelist__title}>
									{deliveryType === deliveryTypeEnum.byCourier ? 'Доставка' : 'Самовывоз'}
								</p>
								<p className={`text_type_u ${styles.pricelist__price}`}>0 руб.</p>
							</div>
							<div className={styles.pricelist__item}>
								<p className={`text_type_u ${styles.summary__title}`}>Скидка</p>
								<p className={`text_type_u ${styles.pricelist__price}`}>
									{cartData.coupon_code ? cartData.discount_amount : 0} руб.
								</p>
							</div>
							<hr className={styles.pricelist__divider} />
						</div>
					</div>
					<div className={styles.summary__promo}>
						<p className={`text_type_u`}>Промокод</p>
						<form className={styles.summary__sale} noValidate>
							<input
								value={inputPromoValue}
								onChange={handleInputPromoChange}
								type="text"
								className={`${styles.summary__input_type_sale}`}
							></input>
							<button
								className={`${styles.summary__btn_type_submit}`}
								onClick={(e) => handleDiscount(e)}
							>
								Применить
							</button>
						</form>
						<span className={styles.summary__promoError}>{promocodeError}</span>
					</div>
					<div className={styles.orderse}>
						<button
							className={`${styles['orderse__buttonStyle']} ${
								!isLoggedIn && !isValid ? `${styles['orderse__buttonStyle_error']}` : ''
							}`}
							onClick={handleSubmitOrder}
							disabled={cartData.products.length === 0}
						>
							Оформить заказ
						</button>
						<div className={styles.execution__item}>
							<input
								type="checkbox"
								name="agreement"
								value="agreed"
								id="agreement"
								onChange={handleAgreementChange}
							/>
							<label htmlFor="agreement">
								<span className={styles.orderse__title}>Я согласен с&nbsp;</span>
								<Link className={styles.orderse__title} to={URLS.AGREEMENT}>
									условиями обработки персональных данных
								</Link>
								<span className={styles.orderse__title}> и&nbsp;</span>
								<Link className={styles.orderse__title} to={URLS.DELIVERY_COND}>
									условиями продажи
								</Link>
							</label>
						</div>
					</div>
				</div>
			</div>
			<PopupCheckoutResponse handleClose={handleClose} text={popupText} />
		</section>
	);
};

export default Checkout;
