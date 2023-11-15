import React, { useState } from 'react';
import Button from '@components/Button';
import styles from './top-selling-this-week.module.scss';
import ProductCard from '@components/product-card';
import { products } from '@data/dataExamples.ts';

type Product = {
	cardName: string;
	price: string;
	weight: string;
	buttonText: string;
};

const TopSellingThisWeek: React.FC = () => {
	const [activeButton, setActiveButton] = useState<number>(1);

	const handleButtonClick = (buttonId: number) => {
		setActiveButton(buttonId);
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
				{products.map((product: Product, index: number) => (
					<ProductCard
						key={index}
						cardName={product.cardName}
						price={product.price}
						weight={product.weight}
					/>
				))}
			</div>
		</div>
	);
};

export default TopSellingThisWeek;
