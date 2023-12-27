import { useState, useEffect } from 'react';
import styles from './profile-favorites.module.scss';
import api from '@services/api';
import ProductCard from '@components/product-card';
import ReturnBackButton from '@components/profile-components/return-back-button';
import { useProfile } from '@hooks/use-profile';
import { useCart } from '@hooks/use-cart-context';
import type { Product } from '@services/generated-api/data-contracts';
import { Link } from 'react-router-dom';

export default function ProfileFavorites() {
	const [productsLoadingStatus, setProductsLoadingStatus] = useState({
		inProcess: false,
		done: false,
		error: '',
	});
	const [products, setProducts] = useState<Array<Product>>([]);
	const [checkboxesValues, setCheckboxesValue] = useState<Record<number, boolean>>({});
	const { isMobileScreen } = useProfile();
	const { updateCart } = useCart();

	useEffect(() => {
		products &&
			products.forEach((product) => {
				setCheckboxesValue((prev) => {
					return { ...prev, [product.id]: false };
				});
			});
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

	const onCheckButton = (id: number) => {
		return () => {
			setCheckboxesValue((prev) => {
				return { ...prev, [id]: !prev[id] };
			});
		};
	};

	const isChooseAll =
		Object.values(checkboxesValues).every((el) => el) || !products.length;

	const toggleAll = () => {
		Object.keys(checkboxesValues).forEach((key) =>
			setCheckboxesValue((prev) => ({ ...prev, [key]: isChooseAll ? false : true }))
		);
	};

	const handleAddToCart = () => {
		const dataToSend = Object.keys(checkboxesValues)
			.filter((i) => checkboxesValues[i as unknown as keyof typeof checkboxesValues])
			.map((item) => ({ id: Number(item), quantity: 1 }));
		updateCart(dataToSend);

		window.scroll(0, 0);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h2 className={styles.title__text}>Избранное</h2>
				<button className={styles.title__button} onClick={toggleAll} type="button">
					{isChooseAll ? 'Удалить все' : 'Выбрать все'}
				</button>
				{isMobileScreen && <ReturnBackButton />}
			</div>
			<ul className={styles.favorites__list}>
				{!productsLoadingStatus.inProcess && products.length ? (
					products.map((product) => (
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
									Object.keys(checkboxesValues)?.length
										? {
												checked: checkboxesValues[product.id],
												onChange: onCheckButton(product.id),
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
			<button
				className={styles.button}
				onClick={handleAddToCart}
				disabled={!Object.values(checkboxesValues).some((i) => i)}
			>
				В корзину
			</button>
		</div>
	);
}
