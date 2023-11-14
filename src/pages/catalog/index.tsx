import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './catalog.module.scss';
import SliderComponent from '@components/slider-component';
import CardCatalogLink from '@components/card-catalog-link';
import { BACKEND_URL } from '@data/constants';
import Api from '@services/api';


type Product = {
	name: string;
	price: string;
	weight: string;
	buttonText: string;
	photo: string;
};

const Catalog: React.FC = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const api = new Api(BACKEND_URL);


	useEffect(() => {
		let categoriesFromApi = [];
    api.productsList()
		.then((data) => {
			return console.log(data.results);

			categoriesFromApi = data.results.map((product: Product) => {
				return {
					cardName: product.name,
					price: product.price,
					weight: '1кг',
					buttonText: 'В корзину',
					cardImage: product.photo,
				};
			})
			setCategories(categoriesFromApi);
		});
  }, [])

	useEffect(() => {
		let productsFromApi = [];
    api.productsList()
		.then((data) => {
			productsFromApi = data.results.map((product: Product) => {

				/* Доделать проверку на отсутствие картинки в АПИ
				if (product.photo === null) {
					photo = NO_IMAGE;
console.log(product.photo);
console.log(photo);
				}
*/

				return {
					cardName: product.name,
					price: product.price,
					weight: '1кг',
					buttonText: 'В корзину',
					cardImage: product.photo,
				};
			})
			setProducts(productsFromApi);
		});
  }, [categories])

	console.log(products);


	return (
		<>
			<SliderComponent />
			<section className={styles.catalogBlock}>
				<div className={styles.catalog}>
					<h1>Каталог товаров</h1>
					<div className={styles.catalog__cardlist}>
						<CardCatalogLink title="Овощи" type="single-row" array={products} />
						<CardCatalogLink title="Фрукты" type="single-row" array={products} />
						<CardCatalogLink title="Молочные продукты" type="single-row" array={products} />
					</div>
				</div>
			</section>
		</>
	);
}

export default Catalog;