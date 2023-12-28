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
	const { cartData, clearCart, loading } = useCart();
	const [deliveryMethod, setDeliveryMethod] = React.useState<string>('By courier');
	const navigate = useNavigate();
	const [promotionProducts, setPromotionProducts] = useState<Product[]>([]);

	const randomNumbers = (): number[] => {
		const unicNumbers = new Set();
		while (unicNumbers.size < 4) {
			const randomNumber = Math.floor(Math.random() * 70) + 1;
			unicNumbers.add(Number(randomNumber));
		}
		const result = Array.from(unicNumbers) as number[];
		return result;
	};

	useEffect(() => {
		Promise.all([
			...randomNumbers().map((id) => {
				return api.productsRead(id);
			}),
		])
			.then((products) => {
				setPromotionProducts(products);
			})
			.catch((error) => {
				console.log('Ошибка Promise.all:', error);
			});
	}, []);

	const handleOrderTypeClick = (type: string) => {
		setDeliveryMethod(type);
	};

	const handleSubmitOrderClick = () => {
		navigate('/cart/order', {
			state: {
				orderType: deliveryMethod,
			},
		});
	};

	const handleClearCart = () => {
		clearCart();
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
							<button
								className={styles.products__btn}
								onClick={handleClearCart}
								disabled={cartData.products.length === 0}
							>
								Очистить корзину
							</button>
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
								{cartData.total_price ? `${cartData.total_price.toFixed(2)} руб.` : '0'}
							</p>
						</div>
						<div className={styles.delivery}>
							<div
								className={`${styles.delivery__btn} ${styles.delivery__btn_byCar} ${
									deliveryMethod === 'Point of delivery' &&
									styles.delivery__btn_byCar_unactive
								} ${
									deliveryMethod === 'Point of delivery' && styles.delivery__btn_unactive
								}`}
								onClick={() => {
									handleOrderTypeClick('By courier');
								}}
							>
								<div
									className={`${styles.delivery__icon} ${styles.delivery__icon_truck}`}
								></div>
								<p className={`text_type_u ${styles.delivery__title}`}>Доставка</p>
							</div>
							<div
								className={`${styles.delivery__btn} ${
									deliveryMethod === 'By courier' && styles.delivery__btn_unactive
								} ${styles.delivery__btn_byThemselves}`}
								onClick={() => {
									handleOrderTypeClick('Point of delivery');
								}}
							>
								<div
									className={`${styles.delivery__icon} ${
										deliveryMethod === 'By courier' && styles.delivery__icon_flag_unactive
									} ${
										deliveryMethod === 'Point of delivery' && styles.delivery__icon_flag
									}`}
								></div>
								<p
									className={`text_type_u ${styles.delivery__title} ${
										deliveryMethod === 'By courier' && styles.delivery__title_unactive
									}`}
								>
									Самовывоз
								</p>
							</div>
						</div>
						<MakingOrderBtn
							onClick={handleSubmitOrderClick}
							disabled={cartData.products.length === 0}
						/>
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
							addedClassName="addedCardClassName"
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
