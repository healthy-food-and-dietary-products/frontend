import React from 'react';
import styles from './catalog.module.scss';
import SliderComponent from '@components/slider-component';
import CardCatalogLink from '@components/card-catalog-link';
import { products } from '@data/dataExamples';

const Catalog: React.FC = () => {
	return (
		<>
			<SliderComponent />
			<section className={styles.catalogBlock}>
				<div className={styles.catalog}>
					<h1>Каталог товаров</h1>
					<div className={styles.catalog__cardlist}>
						<CardCatalogLink title="Овощи" type="single-row" array={products} />
						<CardCatalogLink title="Фрукты" type="single-row" array={products} />
						<CardCatalogLink
							title="Молочные продукты"
							type="single-row"
							array={products}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Catalog;
