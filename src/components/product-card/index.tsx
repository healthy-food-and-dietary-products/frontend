import React from 'react';
import { Link } from 'react-router-dom';
import styles from './product-card.module.scss';
import { BASE_URL } from '@data/constants.ts';

type ProductCardProps = {
	cardName: string;
	price: number;
	final_price?: number;
	weight: number;
	measureUnit?: string;
	cardImage: string;
	category?: string;
	idCard?: number;
	checkboxControl?: { checked: boolean; onChange: () => void };
};

const ProductCard: React.FC<ProductCardProps> = ({
	cardName,
	price,
	weight,
	cardImage,
	category,
	idCard,
	checkboxControl,
	measureUnit,
}) => {
	console.log(measureUnit);

	// Можно вынести в отдельный фал
	if (measureUnit === 'items') {
		measureUnit = 'шт';
	} else if (measureUnit === 'grams') {
		measureUnit = 'гр';
		if (weight > 999) {
			measureUnit = 'кг';
			weight = weight / 1000;
		}
	}

	return (
		<div className={styles.card}>
			<Link className={styles.card__link} to={`/catalog/${category}/${idCard}`}>
				<img
					className={styles.card__image}
					src={
						cardImage !== undefined
							? cardImage.startsWith('/')
								? `${BASE_URL}${cardImage}`
								: cardImage
							: ''
					}
					alt="карточка товара"
				/>
				<h2 className={styles.card__caption}>{cardName}</h2>
			</Link>
			<div className={styles.card__params}>
				<span
					className={`${styles['card__params-text']} ${styles['card__params-text_price']}`}
				>
					{price} руб.
				</span>
				<span
					className={`${styles['card__params-text']} ${styles['card__params-text_weight']}`}
				>{`${weight} ${measureUnit}`}</span>
			</div>

			<div className={styles['card__button-container']}>
				{/* кнопку "В корзину" заменить на кноку из UI-kit */}
				<button className={styles['card__cart-button']}>В корзину</button>

				{checkboxControl ? (
					<input
						type="checkbox"
						onChange={checkboxControl.onChange}
						checked={checkboxControl.checked}
					/>
				) : (
					<button className={styles['card__like-button']} />
				)}
			</div>
		</div>
	);
};

export default ProductCard;
