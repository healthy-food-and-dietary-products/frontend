import React from 'react';
import styles from './shopping-cart.module.scss';
import ProductCard from '@components/product-card';
import { products } from '@data/dataExamples.ts';
import Button from '@components/Button';
import ShoppingList from '@components/shopping-list';

type Product = {
	cardName: string;
	price: string;
	weight: string;
	cardImage: string;
};

const ShoppingCart: React.FC = () => {
	return (
		<section className={styles.cart}>
			<div className={styles.details}>
				<div className={styles.products}>
					<div className={styles.products__title}>
						<h3>5 товаров</h3>
						<button className={`${styles.products__btn} text_type_u `}>
							Очистить корзину
						</button>
					</div>
					<ShoppingList />
				</div>
				<div className={styles.details__form}>
					<div className={styles.details__sum}>
						<p className={`text-m`}>Итого</p>
						<p className={`text-m`}>670 руб.</p>
					</div>
					<div className={styles.delivery}>
						<div className={`${styles.delivery__btn} ${styles.delivery__btn_byCar}`}>
							<div
								className={`${styles.delivery__icon} ${styles.delivery__icon_truck}`}
							></div>
							<p className={`text_type_u ${styles.delivery__title}`}>Доставка</p>
						</div>
						<div
							className={`${styles.delivery__btn} ${styles.delivery__btn_unactive} ${styles.delivery__btn_byThemselves}`}
						>
							<div
								className={`${styles.delivery__icon} ${styles.delivery__icon_flag_unactive}`}
							></div>
							<p
								className={`text_type_u ${styles.delivery__title} ${styles.delivery__title_unactive}`}
							>
								Самовывоз
							</p>
						</div>
					</div>
					<div className={styles.details__order}>
						<Button buttonText="Оформить заказ" buttonStyle="green-button" />
						<p className={`${styles.details__title}`}>
							Нажимая на&nbsp;кнопку &laquo;Оформить заказ&raquo;, вы&nbsp;соглашаетесь
							с&nbsp;условиями обработки персональных данных, а&nbsp;также
							с&nbsp;условиями продажи.
						</p>
					</div>
				</div>
			</div>
			<div className={styles.cart__recomendation}>
				<h2>Вас также может заинтересовать</h2>
				<div className={styles.cart__advertisement}>
					{products.map((product: Product, index: number) => (
						<ProductCard
							key={index}
							cardImage={product.cardImage}
							cardName={product.cardName}
							price={product.price}
							weight={product.weight}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
