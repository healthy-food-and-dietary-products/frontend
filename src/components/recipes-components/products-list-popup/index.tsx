import styles from './products-list-popup.module.scss';
import clsx from 'clsx';
import { useState } from 'react';
import closeIcon from '@images/profile/close.svg';
import plusIcon from '@images/plus_button.svg';
import minusIcon from '@images/minus_button.svg';

import { products as arr } from '@data/dataExamples';

export default function ProductsListPopup() {
	const [products, setProducts] = useState(arr.map((el) => ({ ...el, amount: 1 })));

	const filterProducts = (index: number) => {
		setProducts((prev) => prev.filter((_, i) => i !== index));
	};

	const changeAmount = (index: number) => {
		return (newAmount: number) => {
			setProducts(
				products.map((product, i) => {
					if (i === index) {
						product.amount = Math.min(Math.max(newAmount, 1), 20);
					}
					return product;
				})
			);
		};
	};

	return (
		<div className={styles['products-popup']}>
			<h3 className={styles['products-popup__title']}>Товары в корзину</h3>
			<ul className={styles['products-popup__list']}>
				{products.map((product, index) => (
					<li
						className={clsx(styles['products-popup__item'], styles.product)}
						key={product.cardName}
					>
						<div className={styles.product__image}>
							<img src={product.cardImage} alt={product.cardName} />
						</div>
						<p className={styles.product__name}>{product.cardName}</p>
						<div className={clsx(styles.product__counter, styles.counter)}>
							<button
								className={styles.counter__button}
								onClick={() => changeAmount(index)(product.amount - 1)}
							>
								<img src={minusIcon} alt="минус" />
							</button>
							<p
								className={styles.counter__value}
							>{`${product.amount} ${product.measure_unit}`}</p>
							<button
								className={styles.counter__button}
								onClick={() => changeAmount(index)(product.amount + 1)}
							>
								<img src={plusIcon} alt="плюс" />
							</button>
						</div>
						<p className={styles.product__price}>{`${
							product.price * product.amount
						} руб.`}</p>
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
			<button className={styles['products-popup__button']}>Добавить в корзину</button>
		</div>
	);
}
