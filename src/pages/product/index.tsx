import React from 'react';
import styles from './product.module.scss';
import Button from '@components/Button';
import { productApiDataExample } from '@data/dataExamples';
import { useParams } from 'react-router';
// import { useParams } from 'react-router-dom';

const Product: React.FC = () => {
	const [isInCart, setIsInCart] = React.useState<boolean>(false);
	const [isInFavorities, setIsInFavorities] = React.useState<boolean>(false);

	const { id } = useParams();
	console.log(id);
	// const { id } = useParams();
	{
		/*id получается из ссылки, затем на этой странице происходит запрос к апи за получением информации о товаре */
	}
	//сейчас для примера сделан объект с теми же элементами как в базе данных
	// Затем эта информация о продукте передается в части страницы в виде data.img и тд...

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
			<div className={styles.product__main}>
				<div className={styles.product__info}>
					<div className={styles.product__container}>
						<h2 className={styles.product__title}>{productApiDataExample.name}</h2>

						<p className={`text_type_u ${styles.product__text}`}>
							Арт. {productApiDataExample.id}
						</p>
					</div>

					<h2 className={styles.product__price}>
						{productApiDataExample.price} руб. / кг
					</h2>
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
					src={`${productApiDataExample.photo}`}
					alt={productApiDataExample.name}
				/>
			</div>
			<div className={styles.product__subinfo}>
				<p className={`text_type_u ${styles.product__description}`}>
					{productApiDataExample.description}
				</p>
				<div className={`${styles.product__addition}`}>
					<p className="text-m">Производитель</p>
					<p className={`text_type_u ${styles.product__description}`}>
						{productApiDataExample.producer}
					</p>
				</div>
				<div className={`${styles.product__addition}`}>
					<p className="text-m">Энергетическая ценность (на 100гр.)</p>
					<div className={styles.product__table}>
						<div className={styles.product__container}>
							<p className="text">белки</p>
							<p className="text">{productApiDataExample.proteins}г</p>
						</div>
						<div className={styles.border_vertical}></div>
						<div className={styles.product__container}>
							<p className="text">жиры</p>
							<p className="text">{productApiDataExample.fats}г</p>
						</div>
						<div className={styles.border_vertical}></div>
						<div className={styles.product__container}>
							<p className="text">углеводы</p>
							<p className="text">{productApiDataExample.carbohydrates}г</p>
						</div>
						<div className={styles.border_vertical}></div>
						<div className={styles.product__container}>
							<p className="text">калорийность</p>
							<p className="text">{productApiDataExample.kcal}г</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Product;
