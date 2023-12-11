import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/Button';
import styles from './product-card.module.scss';
import { BASE_URL } from '@data/constants.ts';
import LikeIcon from '@images/like-icon.svg?react';
import clsx from 'clsx';
import { useAuth } from '@hooks/use-auth';
import { usePopup } from '@hooks/use-popup';
import { useCart } from '@hooks/use-cart-context.ts';
import CheckIcon from '@images/check.svg?react';
import api from '@services/api';

type ProductCardProps = {
	cardName: string;
	price: number;
	final_price?: number;
	weight: number;
	measureUnit?: string;
	cardImage: string;
	category?: string;
	idCard: number;
	is_favorited?: boolean;
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
	is_favorited = false,
}) => {
	const { isLoggedIn } = useAuth();
	const { handleOpenPopup } = usePopup();
	const [isLoaded, setIsLoaded] = useState(false);

	const [isFavorite, setIsFavorite] = useState(is_favorited);
	const { cartData, updateCart, deleteCart } = useCart();
	const [isInCart, setIsInCart] = React.useState<boolean>(false);

	useEffect(() => {
		if (idCard !== undefined) {
			const isProductInCart = cartData.products.some((product) => product.id === idCard);
			setIsInCart(isProductInCart);
		}
	}, [cartData, idCard]);

	const handleLikeButton = () => {
		if (isLoaded) return;
		if (!isLoggedIn) return handleOpenPopup('openPopupLogin');
		setIsLoaded(true);
		isFavorite
			? api
					.productsFavoriteDelete(idCard)
					.then(() => setIsFavorite(false))
					.finally(() => setIsLoaded(false))
			: api
					.productsFavoriteCreate(idCard)
					.then(() => setIsFavorite(true))
					.finally(() => setIsLoaded(false));
	};

	const handleCartButton = () => {
		if (isInCart) {
			return deleteCart(idCard);
		}
		return updateCart(idCard, 1);
	};

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
						cardImage !== undefined && cardImage !== null
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
				<Button
					buttonText={isInCart ? 'В корзине' : 'В корзину'}
					buttonStyle={isInCart ? 'green-border-button' : 'green-border-button__active'}
					onClick={handleCartButton}
				/>

				{checkboxControl ? (
					<label className={styles.label}>
						<input
							className={styles.input}
							type="checkbox"
							onChange={checkboxControl.onChange}
							checked={checkboxControl.checked}
						/>
						<span className={styles.checkbox}>
							<CheckIcon className={styles.check} />
						</span>
					</label>
				) : (
					<>
						<button onClick={handleLikeButton} className={styles['card__like-button']}>
							<LikeIcon
								className={clsx(styles['card__like-icon'], isFavorite && styles.favorite)}
							/>
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
