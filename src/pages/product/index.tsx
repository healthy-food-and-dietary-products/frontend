import React, { useEffect } from 'react';
import styles from './product.module.scss';
import Button from '@components/Button';
import { useParams } from 'react-router';
import api from '@services/api.ts';
import Preloader from '@components/preloader';
import ReviewStar from '@images/review-star.svg';
import Breadcrumbs from '@components/breadcrumbs';
import RatingsAndReviewsWidget from '@components/ratings-and-reviews-components/ratings-and-reviews-widget';
import { Product as ProductType, Review } from '@services/generated-api/data-contracts';
import { useAuth } from '@hooks/use-auth';
import { usePopup } from '@hooks/use-popup';
import { useCart } from '@hooks/use-cart-context.ts';
import { useNavigate } from 'react-router-dom';
import plural from '@components/ratings-and-reviews-components/utils/pluralizer';

const Product: React.FC = () => {
	const { cartData, updateCart, deleteCart } = useCart();
	const [isInCart, setIsInCart] = React.useState<boolean>(false);
	const [isProductInCart, setIsProductInCart] = React.useState<boolean>(false);
	const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
	const [productItem, setProductItem] = React.useState<ProductType | null>(null);
	const [reviewsAmount, setReviewsAmount] = React.useState(0);

	const { isLoggedIn } = useAuth();
	const { handleOpenPopup } = usePopup();
	const navigate = useNavigate();
	const { id } = useParams();
	//Нужно с бэка получать в будщем:
	let newMeasureUnit = 'шт';
	if (productItem != null) {
		if (productItem.measure_unit === 'milliliters') {
			newMeasureUnit = 'мл';
		} else if (productItem.measure_unit === 'grams') {
			newMeasureUnit = 'гр';
		}
	}

	useEffect(() => {
		if (id !== undefined) {
			const numericId: number = parseInt(id, 10);
			api
				.productsRead(numericId)
				.then((data) => setProductItem(data))
				.catch((error) => {
					console.log(error);
					navigate('/упс');
				});
			api
				.reviewsList(Number(id))
				.then((res) => {
					const amount = res.filter((item: Review) => !!item.text).length;
					setReviewsAmount(amount);
				})
				.catch((err) => console.log(err));
		} else {
			console.log('ID is undefined');
			navigate('/упс');
		}
	}, [id, navigate]);

	useEffect(() => {
		if (id !== undefined) {
			const numericId: number = parseInt(id, 10);
			const isProductInCart = cartData.products.some(
				(product) => product.id === numericId
			);
			setIsProductInCart(isProductInCart);
			setIsInCart(isProductInCart);
		}
	}, [cartData, id]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleAddCartClick = () => {
		if (isLoaded || !productItem) return;
		if (id !== undefined) {
			const numericId: number = parseInt(id, 10);
			setIsInCart(isProductInCart);
			if (!isProductInCart) {
				updateCart([{ id: numericId, quantity: 1 }]);
				setIsInCart(true);
			} else {
				deleteCart(numericId);
				setIsInCart(false);
			}
		}
	};

	function handleAddToFavorities() {
		if (isLoaded || !productItem) return;
		if (!isLoggedIn) return handleOpenPopup('openPopupLogin');
		setIsLoaded(true);
		productItem.is_favorited
			? api
					.productsFavoriteDelete(productItem.id)
					.then(() => setProductItem({ ...productItem, is_favorited: false }))
					.finally(() => setIsLoaded(false))
			: api
					.productsFavoriteCreate(productItem.id)
					.then(() => setProductItem({ ...productItem, is_favorited: true }))
					.finally(() => setIsLoaded(false));
	}

	return (
		<div className={styles.container}>
			<section className={styles.product}>
				{!productItem ? (
					<Preloader />
				) : (
					<div
						className={`${styles['product__section']}, ${
							productItem && styles['product__section-active']
						}`}
					>
						<Breadcrumbs category={productItem.category} productName={productItem.name} />
						<div className={styles.product__main}>
							<div className={styles.product__info}>
								<div className={styles.product__container}>
									<h2 className={styles.product__title}>{productItem.name}</h2>
									<div className={styles.product__details}>
										<p className={styles.product__text}>Арт. {productItem.id}</p>
										{productItem.rating && (
											<div className={styles.product__rating}>
												<img
													className={styles.product__ratingStar}
													src={ReviewStar}
													alt="Иконка для отзывов"
												/>
												<p className={styles.product__ratingValue}>
													{productItem.rating}
												</p>
											</div>
										)}
										{productItem.rating && reviewsAmount > 0 && (
											<a className={styles.product__reviews} href="#ratings-and-reviews">
												{reviewsAmount}{' '}
												{['отзывов', 'отзыв', 'отзыва'][plural(reviewsAmount)]}
											</a>
										)}
									</div>
								</div>
								<h2 className={styles.product__price}>
									{productItem.price} руб. / {newMeasureUnit}
								</h2>
								<div className={styles.product__btns}>
									<Button
										buttonText={isInCart ? 'В корзине' : 'В корзину'}
										buttonStyle={
											isInCart ? 'green-border-button' : 'green-border-button__active'
										}
										onClick={handleAddCartClick}
									/>
									<Button
										buttonText={productItem.is_favorited ? 'В избранном' : 'В избранное'}
										buttonStyle={
											productItem.is_favorited
												? 'green-border-button'
												: 'green-border-button__active'
										}
										onClick={handleAddToFavorities}
									/>
								</div>
							</div>
							<img
								className={styles.product__image}
								src={`${productItem.photo}`}
								alt={productItem.name}
							/>
						</div>
						<div className={styles.product__subinfo}>
							<p className={`text_type_u ${styles.product__description}`}>
								{productItem.description}
							</p>
							<div className={`${styles.product__addition}`}>
								<p className="text-xl">Срок годности</p>
								<p className={`text_type_u ${styles.product__description}`}>5 суток</p>
							</div>
							<div className={`${styles.product__addition}`}>
								<p className="text-xl">Производитель</p>
								<p className={`text_type_u ${styles.product__description}`}>
									{`«${productItem.producer.producer_name}»`}
								</p>
							</div>
							<div className={`${styles.product__addition}`}>
								<p className="text-xl">Энергетическая ценность (на 100гр.)</p>
								<div className={styles.product__table}>
									<div className={styles.product__container}>
										<p className="text-x">белки</p>
										<p className="text-x">{productItem.proteins}г</p>
									</div>
									<div className={styles.border_vertical}></div>
									<div className={styles.product__container}>
										<p className="text-x">жиры</p>
										<p className="text-x">{productItem.fats}г</p>
									</div>
									<div className={styles.border_vertical}></div>
									<div className={styles.product__container}>
										<p className="text-x">углеводы</p>
										<p className="text-x">{productItem.carbohydrates}г</p>
									</div>
									<div className={styles.border_vertical}></div>
									<div className={styles.product__container}>
										<p className="text-x">ккал-ть</p>
										<p className="text-x">{productItem.kcal}г</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</section>
			{id && <RatingsAndReviewsWidget productId={Number(id)} />}
		</div>
	);
};

export default Product;
