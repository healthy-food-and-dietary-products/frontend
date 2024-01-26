import React from 'react';
import styles from './shopping-item.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '@hooks/use-cart-context.ts';
import { translateMeasureUnit } from '@utils/utils';
import { BASE_URL } from '@data/constants';

type ShoppingItemProps = {
	product: {
		id: number;
		name: string;
		photo: string;
		category: string;
		quantity: number;
		final_price: number;
		total_price: number;
		amount: number;
		measure_unit: string;
	};
};

const ShoppingItem: React.FC<ShoppingItemProps> = (props) => {
	const { addItemToCart, removeItemFromCart, deleteCart } = useCart();
	const { product } = props;
	const { measureUnit, amount } = translateMeasureUnit(
		product.measure_unit,
		product.amount
	);

	const handleDeleteClick = () => {
		deleteCart(product.id);
	};
	const handleDecreaseClick = () => {
		if (product.quantity > 1) {
			removeItemFromCart(product.id);
		}
	};

	const handleIncreaseClick = () => {
		addItemToCart(product.id);
	};

	return (
		<div className={styles.item}>
			<Link to={`/catalog/${product.category}/${product.id}`}>
				<img
					className={styles.item__image}
					src={`${BASE_URL}/media/${product.photo}`}
					alt={product.name}
				/>
			</Link>
			<div className={styles.item__container}>
				<Link
					className={styles.item__link}
					to={`/catalog/${product.category}/${product.id}`}
				>
					<p className={styles.item__title}>{`${product.name}, ${
						amount + measureUnit
					}`}</p>
				</Link>
				<div className={styles.item__weight}>
					<button
						className={`${styles.item_btn} ${styles.item__decrease_btn}`}
						onClick={handleDecreaseClick}
					/>
					<p className={styles.item__measure}>{product.quantity}</p>
					<button
						className={`${styles.item_btn} ${styles.item__increase_btn}`}
						onClick={handleIncreaseClick}
					/>
				</div>
			</div>
			<p className={styles.item__price}>{product.total_price} руб.</p>
			<button
				className={`${styles.item_btn} ${styles.item__delete_btn}`}
				onClick={handleDeleteClick}
			></button>
		</div>
	);
};

export default ShoppingItem;
