import React, { useEffect, useState } from 'react';
import styles from './catalog.module.scss';
import SliderComponent from '@components/slider-component';
import CardCatalogLink from '@components/card-catalog-link';
import { products } from '@data/dataExamples';
import api from '@services/api.ts';

type Catalog = {
	id: number;
	name: string;
};

const Catalog: React.FC = () => {
	const [catalogs, setCatalogs] = useState<Catalog[]>([]);

	useEffect(() => {
		api.categoriesList().then((data) => {
			setCatalogs(data);
		});
	}, []);
	return (
		<>
			<SliderComponent />
			<section className={styles.catalogBlock}>
				<div className={styles.catalog}>
					<h1>Каталог товаров</h1>
					<div className={styles.catalog__cardlist}>
						{catalogs.map((catalog) => (
							<CardCatalogLink
								key={catalog.id}
								title={catalog.name}
								type="single-row"
								array={products}
							/>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Catalog;
