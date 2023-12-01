import React from 'react';
import styles from './shopping-cart.module.scss';
import ProductCard from '@components/product-card';
import { products } from '@data/dataExamples.ts';
import ShoppingList from '@components/shopping-list';
import Breadcrumbs from '@components/breadcrumbs';
// import type { Product } from '@services/generated-api/data-contracts';
import { useNavigate } from 'react-router-dom';
import MakingOrderBtn from '@components/making-order-btn';

type Product = {
	cardName: string;
	price: number;
	weight: number;
	cardImage: string;
	measure_unit?: string;
};

const ShoppingCart: React.FC = () => {
	const [activeButton, setActiveButton] = React.useState<string>('shipment');
	const navigate = useNavigate();

	const handleOrderTypeClick = (type: string) => {
		setActiveButton(type);
		console.log(type);
	};

	const handleSubmitOrderClick = () => {
		const typeToSend = activeButton;

		navigate('/cart/order', {
			state: {
				orderType: typeToSend,
			},
		});
	};

	return (
		<section className={styles.cart}>
			<Breadcrumbs />
			<div className={styles.details}>
				<div className={styles.products}>
					<div className={styles.products__title}>
						<h3 className={styles.products__title_mob}>5 товаров</h3>
						<button className={styles.products__btn}>Очистить корзину</button>
					</div>
					<ShoppingList />
				</div>
				<div className={styles.details__form}>
					<div className={styles.details__sum}>
						<p className={`text-m`}>Итого</p>
						<p className={`text-m`}>670 руб.</p>
					</div>
					<div className={styles.delivery}>
						<div
							className={`${styles.delivery__btn} ${styles.delivery__btn_byCar} ${
								activeButton === 'pickup' && styles.delivery__btn_byCar_unactive
							} ${activeButton === 'pickup' && styles.delivery__btn_unactive}`}
							onClick={() => {
								handleOrderTypeClick('shipment');
							}}
						>
							<div
								className={`${styles.delivery__icon} ${styles.delivery__icon_truck}`}
							></div>
							<p className={`text_type_u ${styles.delivery__title}`}>Доставка</p>
						</div>
						<div
							className={`${styles.delivery__btn} ${
								activeButton === 'shipment' && styles.delivery__btn_unactive
							} ${styles.delivery__btn_byThemselves}`}
							onClick={() => {
								handleOrderTypeClick('pickup');
							}}
						>
							<div
								className={`${styles.delivery__icon} ${
									activeButton === 'shipment' && styles.delivery__icon_flag_unactive
								} ${activeButton === 'pickup' && styles.delivery__icon_flag}`}
							></div>
							<p
								className={`text_type_u ${styles.delivery__title} ${
									activeButton === 'shipment' && styles.delivery__title_unactive
								}`}
							>
								Самовывоз
							</p>
						</div>
					</div>
					<MakingOrderBtn onClick={handleSubmitOrderClick} />
				</div>
			</div>
			<div className={styles.cart__recomendation}>
				<h2 className={styles.cart__title}>Вас также может заинтересовать</h2>
				<div className={styles.cart__advertisement}>
					{products.map((product: Product, index: number) => (
						<ProductCard
							key={index}
							cardImage={product.cardImage}
							cardName={product.cardName}
							price={product.price}
							weight={product.weight}
							measureUnit={product.measure_unit}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
