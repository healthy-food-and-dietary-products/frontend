import React, { ChangeEvent, useEffect, useState } from 'react';
import ProductCard from '@components/product-card';
import styles from './category.module.scss';
import api from '@services/api.ts';
import { useParams } from 'react-router';
import Preloader from '@components/preloader';
import SliderComponent from '@components/slider-component';
import Breadcrumbs from '@components/breadcrumbs';
import type { Product } from '@services/generated-api/data-contracts';
import Filter from '@components/filter';
import { useNavigate } from 'react-router-dom';

type filteredType = {
	[key: string]: boolean;
};
type SelectOptionType = { label: string; value: string };

const Category: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const [categoryName, setCategoryName] = useState('');
	const [categoryObj, setCategoryObj] = useState(undefined);
	const [checkboxState, setCheckboxState] = useState<filteredType>({
		vegetarian: false,
		sugarless: false,
		'gluten-free': false,
		'lactose-free': false,
		kids: false,
		// protein: false,
		// 'lenten-menu': false,
		// 'low-calorie': false,
	});

	const { category } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		api
			.productsList(`?category=${category}`)
			.then((data) => {
				setProducts(data.results);
				setCategoryName(data.results[0]?.category?.category_name);
				setCategoryObj(data.results[0]?.category);
			})
			.catch(() => {
				navigate('/упс');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [category, navigate]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const changeCheckboxState = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'vegetarian') {
			setCheckboxState((prev) => ({ ...prev, vegetarian: !prev.vegetarian }));
		}
		if (e.target.name === 'sugarless') {
			setCheckboxState((prev) => ({ ...prev, sugarless: !prev.sugarless }));
		}
		if (e.target.name === 'gluten-free') {
			setCheckboxState((prev) => ({ ...prev, 'gluten-free': !prev['gluten-free'] }));
		}
		if (e.target.name === 'lactose-free') {
			setCheckboxState((prev) => ({ ...prev, 'lactose-free': !prev['lactose-free'] }));
		}
		if (e.target.name === 'kids') {
			setCheckboxState((prev) => ({ ...prev, kids: !prev.kids }));
		}
	};

	const handleFilter = (item: Product) => {
		const chosenTags = Object.keys(checkboxState).filter(
			(item: string) => checkboxState[item]
		);
		const productTags = item?.tags?.map((item) => item.tag_slug);
		const intersection = productTags?.filter((tag) => chosenTags?.includes(tag));
		const difference = chosenTags.filter((tag) => !productTags?.includes(tag));

		if (chosenTags.length !== 0) {
			if (intersection?.length !== 0 && difference.length === 0) {
				return true;
			}
			return false;
		}

		return true;
	};

	const sortByProperty = (
		arr: Product[],
		property: 'views_number' | 'final_price' | 'promotion_quantity',
		order: 'asc' | 'desc' = 'desc'
	) => {
		return arr.sort((a, b) => {
			const aProp = a[property];
			const bProp = b[property];

			if (aProp !== undefined && bProp !== undefined) {
				return order === 'asc' ? aProp - bProp : bProp - aProp;
			}
			return 0;
		});
	};

	const sortProducts = (option: SelectOptionType | null) => {
		if (option) {
			let sortedProducts: Product[] = [];

			switch (option.value) {
				case 'popular':
					sortedProducts = sortByProperty(products, 'views_number');
					break;
				case 'expensive':
					sortedProducts = sortByProperty(products, 'final_price');
					break;
				case 'cheap':
					sortedProducts = sortByProperty(products, 'final_price', 'asc');
					break;
				case 'rating':
					sortedProducts = sortByProperty(products, 'promotion_quantity');
					break;
				default:
			}
			setProducts([...sortedProducts]);
		}
	};

	return (
		<>
			<SliderComponent />
			<section className={styles['section-container']}>
				<div className={styles['breadcrumbs-container']}>
					<Breadcrumbs category={categoryObj} />
				</div>
				<div className={styles.category}>
					{isLoading ? (
						<Preloader />
					) : (
						<div
							className={`${styles['category__content']}, ${
								!isLoading && styles['category__content-active']
							}`}
						>
							<div className={styles['category__sorting']}>
								<Filter
									sortProducts={sortProducts}
									changeCheckboxState={changeCheckboxState}
								></Filter>
							</div>
							<div className={styles['category__product']}>
								<h1 className={styles['category__product-title']}>{categoryName}</h1>
								<ul className={styles['product__product-container']}>
									{products &&
										products
											.filter((item) => handleFilter(item))
											.map((item) => (
												<li key={item.id}>
													<ProductCard
														cardName={item.name}
														price={item.price}
														weight={item.amount || 0}
														cardImage={item.photo || ''}
														idCard={item.id}
														category={category}
														measureUnit={item.measure_unit}
														is_favorited={item.is_favorited}
													/>
												</li>
											))}
								</ul>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Category;
