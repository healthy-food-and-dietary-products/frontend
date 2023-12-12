import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './checkout.module.scss';
import api from '@services/api.ts';
import Input from '@ui/input';
import { useFormAndValidation } from '@hooks/use-form-and-validation.ts';
import { OrderPostAdd } from '@services/generated-api/data-contracts.ts';
import { useAuth } from '@hooks/use-auth.ts';
import { useCart } from '@hooks/use-cart-context.ts';

type Address = {
	id: number;
	address: string;
};

const Checkout: React.FC = () => {
	const { isLoggedIn, user } = useAuth();
	const { loadCartData } = useCart();
	const location = useLocation();
	const recievedType = location.state?.orderType;
	const { values, handleChange, errors, isValid } = useFormAndValidation();
	const navigate = useNavigate();

	const [deliveryType, setDeliveryType] = React.useState<string>('shipment');
	const [selectedPayment, setSelectedPayment] = React.useState<string>('');
	const [selectedTime, setSelectedTime] = React.useState<string>('');
	const [selectedAddress, setSelectedAddress] = React.useState<string>('');
	const [actualDeliveryType, setActualDeliveryType] = React.useState<string>('');
	const userAddresses = user?.addresses as unknown[] as Address[];
	const [comment, setComment] = React.useState<string>('');
	const addressesById = {
		1: 'Ленина, 23, кв. 19',
		2: 'Улица 2, дом 5',
		3: 'Другой адрес и т.д.',
	};

	const handleSubmitOrder = () => {
		if (isLoggedIn) {
			if (
				!selectedPayment ||
				!actualDeliveryType ||
				(actualDeliveryType !== 'shipment' && !selectedAddress?.toString().trim())
			) {
				alert('Пожалуйста, заполните все обязательные поля');
				return;
			}
		} else {
			if (
				!values.order_firstName?.toString().trim() ||
				!values.order_lastName?.toString().trim() ||
				!values.order_phoneNumber?.toString().trim() ||
				!values.order_email?.toString().trim() ||
				!selectedPayment ||
				!actualDeliveryType ||
				(actualDeliveryType !== 'shipment' && !selectedAddress?.toString().trim())
			) {
				alert('Пожалуйста, заполните все обязательные поля');
				return;
			}
		}

		const formData: OrderPostAdd = {
			user_data: {
				first_name: values.order_firstName?.toString() || '',
				last_name: values.order_lastName?.toString() || '',
				phone_number: values.order_phoneNumber?.toString() || '',
				email: values.order_email?.toString() || '',
			},
			payment_method: selectedPayment as
				| 'Payment at the point of delivery'
				| 'In getting by cash',
			delivery_method: actualDeliveryType as 'Point of delivery' | 'By courier',
			delivery_point:
				actualDeliveryType === 'shipment' ? Number(selectedAddress) || 2 : 2,
			package: 0,
			comment: comment,
			add_address: selectedAddress || '',
		};

		api
			.usersOrderCreate(formData)
			.then(() => {
				navigate('/cart');
				loadCartData();
				alert('заказ оформлен');
			})
			.catch((error) => {
				if (error.response && error.response.data && error.response.data.errors) {
					const errorMessage = error.response.data.errors;
					alert('Ошибка при создании заказа: ' + errorMessage);
				} else {
					alert('Произошла ошибка при создании заказа.');
				}
			});
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

	React.useState(() => {
		if (!recievedType) {
			setDeliveryType('shipment');
		} else {
			setDeliveryType(recievedType);
		}
	});

	useEffect(() => {
		if (deliveryType === 'shipment') {
			setActualDeliveryType('By courier');
		} else {
			setActualDeliveryType('Point of delivery');
		}
	}, [deliveryType]);

	return (
		<section className={styles.order}>
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
							{deliveryType !== 'shipment' ? (
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
											{Object.entries(addressesById).map(([id, address]) => (
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
														value={addr.address}
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
										className={styles.execution__radio}
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
										className={styles.execution__radio}
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
										className={styles.execution__radio}
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
										className={styles.execution__radio}
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
										value="In getting by cash"
										id="payment_cash"
										className={styles.execution__radio}
										onChange={handlePaymentChange}
									/>
									<label htmlFor="payment_cash">Наличными при получении курьера</label>
								</div>
								<hr className={styles.pricelist__divider} />
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="payment"
										value="Payment at the point of delivery"
										id="payment_offline"
										className={styles.execution__radio}
										onChange={handlePaymentChange}
									/>
									<label htmlFor="payment_offline">оплата в пункте выдачи</label>
								</div>
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
								<p className={`text_type_u ${styles.pricelist__price}`}>670 руб.</p>
							</div>
							<div className={styles.pricelist__item}>
								<p className={`text_type_u ${styles.summary__title}`}>Упаковка</p>
								<p className={`text_type_u ${styles.pricelist__price}`}>12 руб.</p>
							</div>
							<div className={styles.pricelist__item}>
								<p className={styles.pricelist__title}>
									{deliveryType === 'shipment' ? 'Доставка' : 'Самовывоз'}
								</p>
								<p className={`text_type_u ${styles.pricelist__price}`}>0 руб.</p>
							</div>
							<hr className={styles.pricelist__divider} />
						</div>
					</div>
					<div className={styles.summary__promo}>
						<p className={`text_type_u`}>Промокод</p>
						<form className={styles.summary__sale} noValidate>
							<input type="text" className={`${styles.summary__input_type_sale}`}></input>
							<button className={`${styles.summary__btn_type_submit}`}>Ok</button>
						</form>
					</div>
					<div className={styles.orderse}>
						<button
							className={`${styles['orderse__buttonStyle']} ${
								!isLoggedIn && !isValid ? `${styles['orderse__buttonStyle_error']}` : ''
							}`}
							onClick={handleSubmitOrder}
						>
							Оформить заказ
						</button>
						<p className={`${styles.orderse__title}`}>
							Нажимая на&nbsp;кнопку &laquo;Оформить заказ&raquo;, вы&nbsp;соглашаетесь
							с&nbsp;условиями обработки персональных данных, а&nbsp;также
							с&nbsp;условиями продажи.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Checkout;
