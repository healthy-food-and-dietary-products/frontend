import React, { useState } from 'react';
import styles from './products-list-popup.module.scss';
import clsx from 'clsx';
import { useCart } from '@hooks/use-cart-context';
import closeIcon from '@images/profile/close.svg';
import plusIcon from '@images/plus_button.svg';
import minusIcon from '@images/minus_button.svg';

type ReceipeIngredient = {
	id: number;
	name: string;
	measure_unit: string;
	quantity: number;
	ingredient_photo: string;
	amount_of_pack: number;
	amount?: number;
	price?: number;
};

type RecipeIngredientsProps = {
	ingredients: ReceipeIngredient[];
};

const ProductsListPopup: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
	const [products, setProducts] = useState<ReceipeIngredient[]>(Array);
	const { updateCart } = useCart();

	const filterProducts = (index: number) => {
		setProducts((prev) => prev.filter((_, i) => i !== index));
	};

	const changeAmount = (index: number) => {
		return (newAmount: number) => {
			setProducts(
				products?.map((product, i) => {
					if (i === index) {
						product.amount_of_pack = Math.min(Math.max(newAmount, 1), 20);
					}
					return product;
				})
			);
		};
	};

	const handleAddToCart = () => {
		const data = products.map((prod) => {
			return { id: prod.id, quantity: prod.amount_of_pack };
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
								<img src={product.ingredient_photo} alt={product.name} />
							</div>
							<p
								className={styles.product__name}
							>{`${product.name}, ${product.amount}${product.measure_unit}`}</p>

							<div className={clsx(styles.product__counter, styles.counter)}>
								<button
									className={styles.counter__button}
									onClick={() =>
										product.amount_of_pack &&
										changeAmount(index)(product.amount_of_pack - 1)
									}
								>
									<img src={minusIcon} alt="минус" />
								</button>
								<p className={styles.counter__value}>{`${product.amount_of_pack} уп.`}</p>
								<button
									className={styles.counter__button}
									onClick={() =>
										product.amount_of_pack &&
										changeAmount(index)(product.amount_of_pack + 1)
									}
								>
									<img src={plusIcon} alt="плюс" />
								</button>
							</div>

							{product.price && product.amount_of_pack && (
								<p className={styles.product__price}>{`${
									product.price * product.amount_of_pack
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
				<button className={styles['products-popup__button']} onClick={handleAddToCart}>
					Добавить в корзину
				</button>
			</div>
		)
	);
};

export default ProductsListPopup;
