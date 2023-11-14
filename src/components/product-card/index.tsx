import { Link } from 'react-router-dom';
import anyCardImage from '@images/mango.png';
import styles from './product-card.module.scss';

type ProductCardProps = {
	cardName: string;
	price: string;
	weight: string;
	buttonText: string;
	cardImage: string;
};

const ProductCard = ({ cardName, price, weight, buttonText, cardImage }: ProductCardProps) => {
	return (
		<div className={styles.card}>
			{/* вместо /login подставить нужный роут  */}
			{/*Предполагается в будущем открывать страницу товара по пути id и категории*/}
			<Link className={styles.card__link} to={`catalog/category/subcategory/id`}>
				<img className={styles.card__image} src={cardImage != 'NULL' ? cardImage : anyCardImage} alt="карточка товара" />
				<h2 className={styles.card__caption}>{cardName}</h2>
			</Link>
			<span className={styles.card__price}>{price}</span>
			<span className={styles.card__weight}>{weight}</span>
			<div className={styles['card__button-container']}>
				{/* кнопку "В корзину" заменить на кноку из UI-kit */}
				<button className={styles['card__cart-button']}>{buttonText}</button>
				<button className={styles['card__like-button']} />
			</div>
		</div>
	);
};

export default ProductCard;
