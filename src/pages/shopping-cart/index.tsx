import React, { useEffect, useState } from 'react';
import styles from './shopping-cart.module.scss';
import ProductCard from '@components/product-card';
import api from '@services/api';
import ShoppingList from '@components/shopping-list';
import Breadcrumbs from '@components/breadcrumbs';
import { useNavigate } from 'react-router-dom';
import MakingOrderBtn from '@components/making-order-btn';
import { useCart } from '@hooks/use-cart-context.ts';
import Preloader from '@components/preloader';
import { Product } from '@services/generated-api/data-contracts';

const ShoppingCart: React.FC = () => {
	const { cartData, loading } = useCart();
	const [activeButton, setActiveButton] = React.useState<string>('shipment');
	const navigate = useNavigate();
	const [promotionProducts, setPromotionProducts] = useState<Product[]>([]);
	const randomNumber = () => Math.floor(Math.random() * 70) + 1;

	useEffect(() => {
		Promise.all([
			api.productsRead(randomNumber()),
			api.productsRead(randomNumber()),
			api.productsRead(randomNumber()),
		])
			.then(([prod1, prod2, prod3]) => setPromotionProducts([prod1, prod2, prod3]))
			.catch((error) => {
				console.log('Ошибка Promise.all:', error);
			});
	}, []);

	const handleOrderTypeClick = (type: string) => {
		setActiveButton(type);
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
			{loading ? (
				<Preloader />
			) : (
				<div className={`${styles['details']}, ${!loading && styles['details-active']}`}>
					<div className={styles.products}>
						<div className={styles.products__title}>
							<h3
								className={styles.products__title_mob}
							>{`${cartData.count_of_products} товаров`}</h3>
							<button className={styles.products__btn}>Очистить корзину</button>
						</div>

						{cartData.products.length > 0 ? (
							<ShoppingList products={cartData.products} />
						) : (
							<p>Добавьте продукт</p>
						)}
					</div>
					<div className={styles.details__form}>
						<div className={styles.details__sum}>
							<p className={`text-m`}>Итого</p>
							<p className={`text-m`}>
								{cartData.total_price ? `${cartData.total_price.toFixed(2)} руб.` : 'N/A'}
							</p>
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
			)}
			<div className={styles.cart__recomendation}>
				<h2 className={styles.cart__title}>Вас также может заинтересовать</h2>
				<div className={styles.cart__advertisement}>
					{promotionProducts.map((product) => (
						<ProductCard
							idCard={product.id}
							key={product.id}
							cardImage={product.photo || ''}
							cardName={product.name}
							price={product.price}
							weight={product.amount || 0}
							measureUnit={product.measure_unit}
							category={product.category?.category_slug}
							is_favorited={product.is_favorited}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
