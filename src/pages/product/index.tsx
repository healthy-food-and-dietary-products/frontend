import React, { useEffect } from 'react';
import styles from './product.module.scss';
import Button from '@components/Button';
import { useParams } from 'react-router';
import api from '@services/api.ts';
import Preloader from '@components/preloader';

type ProductItem = {
	id: number;
	name: string;
	amount: number;
	carbohydrates: number;
	photo: string;
	price: number;
	description: string;
	producer_name: string;
	proteins: number;
	kcal: number;
	fats: number;
	producer: {
		producer_name: string;
	};
	category: {
		category_name: string;
	};
};

const Product: React.FC = () => {
	const [isInCart, setIsInCart] = React.useState<boolean>(false);
	const [isInFavorities, setIsInFavorities] = React.useState<boolean>(false);
	const [productItem, setProductItem] = React.useState<ProductItem | null>(null);

	const { id } = useParams();

	useEffect(() => {
		if (id !== undefined) {
			const numericId: number = parseInt(id, 10);
			api
				.productsRead(numericId)
				.then((data) => setProductItem(data))
				.catch((error) => console.log(error));
		} else {
			console.log('ID is undefined');
		}
	}, [id]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function handleAddCartClick() {
		setIsInCart(!isInCart);
		if (!isInCart) {
			console.log('убрали из корзины((((');
		}
		console.log('кнопка В Корзину нажата!');
		console.log(isInCart);
	}

	function handleAddToFavorities() {
		setIsInFavorities(!isInFavorities);
		if (!isInFavorities) {
			console.log('убрали из избранного');
		}
		console.log('кнопка В избранное нажата!');
		console.log(isInFavorities);
	}

	return (
		<section className={styles.product}>
			{!productItem ? (
				<Preloader />
			) : (
				<div
					className={`${styles['product__section']}, ${
						productItem && styles['product__section-active']
					}`}
				>
					<div className={styles.product__main}>
						<div className={styles.product__info}>
							<div className={styles.product__container}>
								<h2 className={styles.product__title}>{productItem.name}</h2>

								<p className={`text_type_u ${styles.product__text}`}>
									Арт. {productItem.id}
								</p>
							</div>

							<h2 className={styles.product__price}>{productItem.price} руб. / кг</h2>
							<div className={styles.product__btns}>
								<Button
									buttonText={isInCart ? 'В корзине' : 'В корзину'}
									buttonStyle={isInCart ? 'cart-button__active' : 'cart-button'}
									onClick={handleAddCartClick}
								/>
								<Button
									buttonText={isInFavorities ? 'В избранном' : 'В избранное'}
									buttonStyle={
										isInFavorities ? 'green-border-button__active' : 'green-border-button'
									}
									onClick={handleAddToFavorities}
								/>
							</div>
						</div>
						<img
							className={styles.product__image}
							src={`${productItem.photo}`}
							alt={productItem.name}
						/>
					</div>
					<div className={styles.product__subinfo}>
						<p className={`text_type_u ${styles.product__description}`}>
							{productItem.description}
						</p>
						<div className={`${styles.product__addition}`}>
							<p className="text-m">Производитель</p>
							<p className={`text_type_u ${styles.product__description}`}>
								{productItem.producer.producer_name}
							</p>
						</div>
						<div className={`${styles.product__addition}`}>
							<p className="text-m">Энергетическая ценность (на 100гр.)</p>
							<div className={styles.product__table}>
								<div className={styles.product__container}>
									<p className="text">белки</p>
									<p className="text">{productItem.proteins}г</p>
								</div>
								<div className={styles.border_vertical}></div>
								<div className={styles.product__container}>
									<p className="text">жиры</p>
									<p className="text">{productItem.fats}г</p>
								</div>
								<div className={styles.border_vertical}></div>
								<div className={styles.product__container}>
									<p className="text">углеводы</p>
									<p className="text">{productItem.carbohydrates}г</p>
								</div>
								<div className={styles.border_vertical}></div>
								<div className={styles.product__container}>
									<p className="text">калорийность</p>
									<p className="text">{productItem.kcal}г</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Product;
