import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './product-card.module.scss';
import { BASE_URL } from '@data/constants.ts';
import LikeIcon from '@images/like-icon.svg?react';
import clsx from 'clsx';
import { useAuth } from '@hooks/use-auth';
import { usePopup } from '@hooks/use-popup';
import { useCart } from '@hooks/use-cart-context.ts';
import CheckIcon from '@images/check.svg?react';
import api from '@services/api';
import { translateMeasureUnit } from '@utils/utils';

type ProductCardProps = {
	cardName: string;
	price: number;
	final_price?: number;
	weight: number;
	measureUnit: string;
	cardImage: string;
	category?: string;
	idCard: number;
	is_favorited?: boolean;
	checkboxControl?: { checked: boolean; onChange: () => void };
	addedClassName?: string;
	withButtons?: boolean;
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
	addedClassName = '',
	is_favorited = false,
	withButtons = true,
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
		return updateCart([{ id: idCard, quantity: 1 }]);
	};

	const { measureUnit: newMeasureUnit, amount } = translateMeasureUnit(
		measureUnit,
		weight
	);

	return (
		<div className={`${styles.card} ${addedClassName && styles[addedClassName]}`}>
			<Link className={styles.link} to={`/catalog/${category}/${idCard}`}>
				<img
					className={styles.image}
					src={
						cardImage
							? cardImage.startsWith('/')
								? `${BASE_URL}${cardImage}`
								: cardImage
							: ''
					}
					alt="карточка товара"
				/>
			</Link>
			<div className={styles.content}>
				<Link className={styles.link} to={`/catalog/${category}/${idCard}`}>
					<h2 className={styles.title}>{cardName}</h2>
				</Link>
				<div className={styles.params}>
					<span className={`${styles.text} ${styles.price}`}>{price} руб.</span>
					<span className={`${styles.text} ${styles.weight}`}>
						{amount} {newMeasureUnit}
					</span>
				</div>
			</div>
			{withButtons && (
				<div className={styles.buttons}>
					<button
						className={`${styles.cartButton} ${isInCart && styles.cartButton__active}`}
						type="button"
						onClick={handleCartButton}
					>
						{isInCart ? 'В корзине' : 'В корзину'}
					</button>
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
							<button onClick={handleLikeButton} className={styles.likeButton}>
								<LikeIcon
									className={clsx(styles.likeIcon, isFavorite && styles.favorite)}
								/>
							</button>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ProductCard;
