import { useState, useEffect } from 'react';
import styles from './profile-favorites.module.scss';
import api from '@services/api';
import ProductCard from '@components/product-card';
import type { Product } from '@services/generated-api/data-contracts';
import { Link } from 'react-router-dom';

export default function ProfileFavorites() {
	const [productsLoadingStatus, setProductsLoadingStatus] = useState({
		inProcess: false,
		done: false,
		error: '',
	});
	const [products, setProducts] = useState<Array<Product>>([]);
	const [checkboxesValues, setCheckboxesValue] = useState<boolean[]>([]);

	useEffect(() => {
		products && setCheckboxesValue(products.map(() => false));
	}, [products]);

	useEffect(() => {
		setProductsLoadingStatus({
			inProcess: true,
			done: false,
			error: '',
		});
		api
			.productsList('?is_favorited=1&limit=100')
			.then((list) => {
				setProducts(list.results);
				setProductsLoadingStatus({
					inProcess: false,
					done: true,
					error: '',
				});
			})
			.catch((error) => {
				setProductsLoadingStatus({
					inProcess: false,
					done: false,
					error: error,
				});
			});
	}, []);

	const onCheckButton = (index: number) => {
		return () => {
			setCheckboxesValue(
				checkboxesValues.map((value, i) => (i === index ? !value : value))
			);
		};
	};

	const isChooseAll = checkboxesValues.every((el) => el) || !products.length;

	const toggleAll = () => {
		setCheckboxesValue(checkboxesValues.map(() => (isChooseAll ? false : true)));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h2 className={styles.title__text}>Избранное</h2>
				<button className={styles.title__button} onClick={toggleAll} type="button">
					{isChooseAll ? 'Удалить все' : 'Выбрать все'}
				</button>
			</div>
			<ul className={styles.favorites__list}>
				{!productsLoadingStatus.inProcess && products.length ? (
					products.map((product, index) => (
						<li className={styles.favorites__item} key={product.id}>
							<ProductCard
								cardName={product.name}
								price={product.price}
								weight={product.amount || 0}
								measureUnit={product.measure_unit}
								cardImage={product.photo || ''}
								idCard={product.id}
								category={product?.category?.category_slug}
								checkboxControl={
									checkboxesValues.length
										? {
												checked: checkboxesValues[index],
												onChange: onCheckButton(index),
										  }
										: undefined
								}
							/>
						</li>
					))
				) : (
					<p className={styles.list__empty}>
						<span>Перейдите в</span>{' '}
						<Link className={styles.link} to={'/catalog'}>
							КАТАЛОГ
						</Link>{' '}
						<span>что бы ознакомится с ассортиментом.</span>
					</p>
				)}
			</ul>
			<button className={styles.button}>В корзину</button>
		</div>
	);
}
