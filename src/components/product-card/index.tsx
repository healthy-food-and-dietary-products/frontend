import { Link } from 'react-router-dom';
import styles from './product-card.module.scss';

type ProductCardProps = {
	cardName?: string;
	price?: number;
	weight?: string;
	cardImage?: string;
	category?: string;
	idCard?: number;
	// добавить в пропсы cardImage когда будет готов массив карточек продуктов
	// cardImage: string;
};

const ProductCard = ({
	cardName,
	price,
	weight,
	cardImage,
	category,
	idCard,
}: ProductCardProps) => {
	const baseUrl = 'https://goodfood.acceleratorpracticum.ru';

	return (
		<div className={styles.card}>
			<Link className={styles.card__link} to={`/catalog/${category}/${idCard}`}>
				<img
					className={styles.card__image}
					src={
						cardImage !== undefined
							? cardImage.startsWith('/')
								? `${baseUrl}${cardImage}`
								: cardImage
							: ''
					}
					alt="карточка товара"
				/>
				<h2 className={styles.card__caption}>{cardName}</h2>
			</Link>
			<span className={styles.card__price}>{price} руб.</span>
			<span className={styles.card__weight}>{weight}</span>
			<div className={styles['card__button-container']}>
				{/* кнопку "В корзину" заменить на кноку из UI-kit */}
				<button className={styles['card__cart-button']}>В корзину</button>
				<button className={styles['card__like-button']} />
			</div>
		</div>
	);
};

export default ProductCard;
