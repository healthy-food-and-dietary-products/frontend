import React from 'react';
import styles from './shopping-item.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '@hooks/use-cart-context.ts';
import { translateMeasureUnit } from '@utils/utils';

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
					src={`https://goodfood.acceleratorpracticum.ru/media/${product.photo}`}
					alt={product.name}
				/>
			</Link>
			<div className={styles.item__container}>
				<div className={`${styles['item__title-container']}`}>
					<p className={`text_type_u ${styles.item__title}`}>{`${product.name}, ${
						amount + measureUnit
					}`}</p>
				</div>
				<div className={styles.item__weight}>
					<button
						className={`${styles.item_btn} ${styles.item__decrease_btn}`}
						onClick={handleDecreaseClick}
					></button>
					<p className={`text_type_u ${styles.item__measure}`}>{product.quantity}</p>
					<button
						className={`${styles.item_btn} ${styles.item__increase_btn}`}
						onClick={handleIncreaseClick}
					></button>
				</div>
			</div>
			<p className={`text_type_u ${styles.item__price}`}>{product.total_price} руб.</p>
			<button
				className={`${styles.item_btn} ${styles.item__delete_btn}`}
				onClick={handleDeleteClick}
			></button>
		</div>
	);
};

export default ShoppingItem;
