import React, { useEffect, useState } from 'react';
import styles from './catalog.module.scss';
import SliderComponent from '@components/slider-component';
import CardCatalogLink from '@components/card-catalog-link';
import api from '@services/api.ts';
import Preloader from '@components/preloader';
import Breadcrumbs from '@components/breadcrumbs';
import { Product } from '@services/generated-api/data-contracts';

type Catalog = {
	id: number;
	name: string;
	slug: string;
	top_products: Product[];
};

const Catalog: React.FC = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [catalogs, setCatalogs] = useState<Catalog[]>([]);

	useEffect(() => {
		setIsLoading(true);
		api
			.categoriesList()
			.then((data) => {
				setCatalogs(data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<SliderComponent />
			<section className={styles.catalogBlock}>
				{isLoading ? (
					<Preloader />
				) : (
					<div className={styles.catalog}>
						<Breadcrumbs />
						<h1 className={styles.title}>Каталог товаров</h1>
						<div
							className={`${styles['catalog__cardlist']}, ${
								!isLoading && styles['catalog__cardlist-active']
							}`}
						>
							{catalogs.map((catalog) => (
								<CardCatalogLink
									key={catalog.id}
									title={catalog.name}
									category={catalog.slug}
									type="single-row"
									array={catalog.top_products.slice(0, 3)}
								/>
							))}
						</div>
					</div>
				)}
			</section>
		</>
	);
};

export default Catalog;
