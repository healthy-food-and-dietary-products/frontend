import React, { useEffect, useState } from 'react';
import api from '@services/api';
import type { Product } from '@services/generated-api/data-contracts';
import Button from '@components/Button';
import ProductCard from '@components/product-card';
import styles from './top-selling-this-week.module.scss';

const TopSellingThisWeek: React.FC = () => {
	const [activeButton, setActiveButton] = useState<number>(1);
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [topProducts, setTopproducts] = useState<Product[]>([]);

	const findTopThreeProducts = (slugs: string[] = []) => {
		const topThreeProducts: Product[] = allProducts
			// фильтровать можно будет по полю tags, когда его добавят
			.filter((product) => {
				if (slugs.length === 0) {
					return true;
				}
				return slugs.includes(product.category?.category_slug || '');
			})
			.sort((a, b) => {
				if (b.orders_number !== undefined && a.orders_number !== undefined) {
					return b.orders_number - a.orders_number;
				}

				return 0;
			})
			.slice(0, 3);
		setTopproducts(topThreeProducts);
	};

	useEffect(() => {
		api.productsList('?limit=100').then((data) => {
			setAllProducts(data.results);
			// findTopThreeProducts();
			const topThreeProducts: Product[] = data.results
				.sort((a: Product, b: Product) => {
					if (b.orders_number !== undefined && a.orders_number !== undefined) {
						return b.orders_number - a.orders_number;
					}

					return 0;
				})
				.slice(0, 3);
			setTopproducts(topThreeProducts);
		});
	}, []);

	const handleButtonClick = (buttonId: number) => {
		setActiveButton(buttonId);

		if (buttonId === 1) {
			findTopThreeProducts();
		}
		if (buttonId === 2) {
			const slugs = ['fruits', 'vegetables'];
			findTopThreeProducts(slugs);
		}
		if (buttonId === 3) {
			const slugs = ['vegetables', 'nuts-dried-fruits', 'cereals-and-pasta', 'fruits'];
			findTopThreeProducts(slugs);
		}
		if (buttonId === 4) {
			const slugs = ['dairy', 'cereals-and-pasta'];
			findTopThreeProducts(slugs);
		}
	};

	return (
		<div className={styles.topSellingThisWeek}>
			<h2 className={styles.topSellingThisWeek__title}>Лидеры продаж этой недели</h2>
			<div className={styles.topSellingThisWeek__buttonContainers}>
				<Button
					buttonText="Все категории"
					buttonStyle="greenish-button"
					classNameActive={`${activeButton === 1 ? 'greenish-button__active' : ''}`}
					onClick={() => handleButtonClick(1)}
				/>
				<Button
					buttonText="Овощи и Фрукты"
					buttonStyle="greenish-button"
					classNameActive={`${activeButton === 2 ? 'greenish-button__active' : ''}`}
					onClick={() => handleButtonClick(2)}
				/>
				<Button
					buttonText="Для вегетарианцев"
					buttonStyle="greenish-button"
					classNameActive={`${activeButton === 3 ? 'greenish-button__active' : ''}`}
					onClick={() => handleButtonClick(3)}
				/>
				<Button
					buttonText="Безлактозные продукты"
					buttonStyle="greenish-button"
					classNameActive={`${activeButton === 4 ? 'greenish-button__active' : ''}`}
					onClick={() => handleButtonClick(4)}
				/>
			</div>
			<div className={styles.topSellingThisWeek__cardsContainer}>
				{topProducts.map((product: Product) => (
					<ProductCard
						key={product.id}
						idCard={product.id}
						cardName={product.name}
						price={`${product.final_price} руб.`}
						weight={
							(product.amount &&
								product.measure_unit &&
								product.amount + product.measure_unit) ||
							''
						}
						cardImage={product.photo || ''}
					/>
				))}
			</div>
		</div>
	);
};

export default TopSellingThisWeek;
