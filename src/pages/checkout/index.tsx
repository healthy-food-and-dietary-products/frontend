import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './checkout.module.scss';
import MakingOrderBtn from '@components/making-order-btn';

const Checkout: React.FC = () => {
	const location = useLocation();
	const recievedType = location.state?.orderType;
	const [deliveryType, setDeliveryType] = React.useState<string>('shipment');

	const handleSubmitOrder = () => {
		console.log(deliveryType);
	};

	React.useState(() => {
		if (!recievedType) {
			setDeliveryType('shipment');
		} else {
			setDeliveryType(recievedType);
		}
	});

	return (
		<section className={styles.order}>
			<div className={styles.details}>
				<div className={styles.execution}>
					<h2>Оформление заказа</h2>
					<form className={`${styles.execution__form} text-m`}>
						<label className={styles.execution__address}>
							{deliveryType === 'shipment' ? 'Адрес доставки' : 'Адрес пункта самовывоза'}
							<select className={styles.execution__combobox}>
								<option
									value="Ленина, 23, кв. 19"
									className={styles.order__address_option}
								>
									Ленина, 23, кв. 19
								</option>
							</select>
						</label>

						<label className={styles.execution__address}>
							Комментарий
							<textarea className={styles.execution__comment} maxLength={200}></textarea>
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
									></input>
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
									></input>
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
									></input>
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
									></input>
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
										value="cash"
										id="payment_cash"
										className={styles.execution__radio}
									></input>
									<label htmlFor="payment_cash">Наличными при получении</label>
								</div>
								<hr className={styles.pricelist__divider} />
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="payment"
										value="card_online"
										id="payment_online"
										className={styles.execution__radio}
									></input>
									<label htmlFor="payment_online">Картой онлайн</label>
								</div>
								<hr className={styles.pricelist__divider} />
								<div className={styles.execution__item}>
									<input
										type="radio"
										name="payment"
										value="card_offline"
										id="payment_offline"
										className={styles.execution__radio}
									></input>
									<label htmlFor="payment_offline">Картой при получении</label>
								</div>
							</div>
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
					<MakingOrderBtn onClick={handleSubmitOrder} />
				</div>
			</div>
		</section>
	);
};

export default Checkout;
