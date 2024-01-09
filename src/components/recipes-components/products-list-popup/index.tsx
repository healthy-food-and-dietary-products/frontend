import React, { useState } from 'react';
import clsx from 'clsx';
import { useCart } from '@hooks/use-cart-context';
import type { ReceipeIngredient, RecipeIngredientsProps } from '../types';
import closeIcon from '@images/profile/close.svg';
import plusIcon from '@images/plus_button.svg';
import minusIcon from '@images/minus_button.svg';
import styles from './products-list-popup.module.scss';

const ProductsListPopup: React.FC<RecipeIngredientsProps> = ({
	ingredients,
	handleClick,
}) => {
	const [products, setProducts] = useState<ReceipeIngredient[]>(Array);
	const { updateCart, error, reset, successText, cartUpdating } = useCart();

	const filterProducts = (index: number) => {
		setProducts((prev) => prev.filter((_, i) => i !== index));
	};

	const changeAmount = (index: number) => {
		reset();

		return (newAmount: number) => {
			setProducts(
				products?.map((product, i) => {
					if (i === index) {
						product.need_to_buy = Math.min(Math.max(newAmount, 1), 20);
					}
					return product;
				})
			);
		};
	};

	const handleAddToCart = () => {
		const data = products.map((prod) => {
			return { id: prod.id, quantity: prod.need_to_buy };
		});
		updateCart(data);
	};

	React.useEffect(() => {
		if (!ingredients) {
			return;
		}

		setProducts(ingredients);
	}, [ingredients]);

	return (
		products && (
			<div className={styles['products-popup']}>
				<h3 className={styles['products-popup__title']}>Товары в корзину</h3>
				<ul className={styles['products-popup__list']}>
					{products.map((product, index) => (
						<li
							className={clsx(styles['products-popup__item'], styles.product)}
							key={product.name}
						>
							<div className={styles.product__image}>
								<img
									onClick={() => handleClick(product.id)}
									src={product.ingredient_photo}
									alt={product.name}
								/>
							</div>
							<p
								className={styles.product__name}
								onClick={() => handleClick(product.id)}
							>{`${product.name}, ${product.amount}${product.measure_unit}`}</p>

							<div className={clsx(styles.product__counter, styles.counter)}>
								<button
									className={styles.counter__button}
									onClick={() =>
										product.need_to_buy && changeAmount(index)(product.need_to_buy - 1)
									}
								>
									<img src={minusIcon} alt="минус" />
								</button>
								<p className={styles.counter__value}>{product.need_to_buy}</p>
								<button
									className={styles.counter__button}
									onClick={() =>
										product.need_to_buy && changeAmount(index)(product.need_to_buy + 1)
									}
								>
									<img src={plusIcon} alt="плюс" />
								</button>
							</div>

							{product.final_price && product.need_to_buy && (
								<p className={styles.product__price}>{`${
									product.final_price * product.need_to_buy
								} руб.`}</p>
							)}
							<button
								onClick={() => filterProducts(index)}
								className={styles.product__delete}
								type="button"
							>
								<img src={closeIcon} alt="удалить" />
							</button>
						</li>
					))}
				</ul>
				<p
					className={clsx(
						styles.product__resultText,
						successText.updateCart && styles.product__success,
						error.updateCart && styles.product__error
					)}
				>
					{successText.updateCart || error.updateCart}
				</p>
				<button
					className={styles['products-popup__button']}
					onClick={handleAddToCart}
					disabled={cartUpdating}
				>
					Добавить в корзину
				</button>
			</div>
		)
	);
};

export default ProductsListPopup;
