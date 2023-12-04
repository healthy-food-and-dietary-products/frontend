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

	const sortProducts = (products: Product[]) => {
		return products
			.sort((a, b) => {
				if (b.orders_number !== undefined && a.orders_number !== undefined) {
					return b.orders_number - a.orders_number;
				}

				return 0;
			})
			.slice(0, 3);
	};

	const findTopThreeProducts = (slugs: string[] = []) => {
		const filteredProducts: Product[] = allProducts.filter((product) => {
			if (slugs.length === 0) {
				return true;
			}
			return slugs.includes(product.category?.category_slug || '');
		});

		const topThreeProducts = sortProducts(filteredProducts);

		setTopproducts(topThreeProducts);
	};

	const findTopThreeProductsWithTags = (tag: string) => {
		const filteredProducts = allProducts.filter((product) => {
			return product.tags?.some((prod) => {
				return prod.tag_slug === tag;
			});
		});

		const topThreeProducts = sortProducts(filteredProducts);

		setTopproducts(topThreeProducts);
	};

	useEffect(() => {
		api.productsList('?limit=100').then((data) => {
			setAllProducts(data.results);
			const topThreeProducts: Product[] = sortProducts(data.results);
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
			findTopThreeProductsWithTags('vegetarian');
		}
		if (buttonId === 4) {
			findTopThreeProductsWithTags('lactose-free');
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
						is_favorited={product.is_favorited}
						price={product?.final_price || 0}
						weight={(product.amount && product?.amount) || 0}
						measureUnit={product.measure_unit}
						cardImage={product.photo || ''}
					/>
				))}
			</div>
		</div>
	);
};

export default TopSellingThisWeek;
