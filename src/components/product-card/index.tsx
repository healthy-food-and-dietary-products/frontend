import { Link } from 'react-router-dom';
import cardImage from '@images/mango.png';
import styles from './product-card.module.scss';

type ProductCardProps = {
	cardName: string;
	price: string;
	weight: string;
	buttonText: string;
	// добавить в пропсы cardImage когда будет готов массив карточек продуктов
	// cardImage: string;
};

const ProductCard = ({ cardName, price, weight, buttonText }: ProductCardProps) => {
	return (
		<li className={styles.card}>
			{/* вместо /login подставить нужный роут  */}
			<Link className={styles.card__link} to={'/login'}>
				<img className={styles.card__image} src={cardImage} alt="карточка товара" />
				<h2 className={styles.card__caption}>{cardName}</h2>
			</Link>
			<span className={styles.card__price}>{price}</span>
			<span className={styles.card__weight}>{weight}</span>
			<div className={styles['card__button-container']}>
				{/* кнопку "В корзину" заменить на кноку из UI-kit */}
				<button className={styles['card__cart-button']}>{buttonText}</button>
				<button className={styles['card__like-button']} />
			</div>
		</li>
	);
};

export default ProductCard;
