import cardImage from '@images/mango.png';
import { Link } from 'react-router-dom';
import styles from './product-card.module.scss';

const ProductCard = () => {
	return (
		<li className={styles.card}>
			<div>
				{/* вместо /login подставить нужный роут  */}
				<Link className={styles.card__link} to={'/login'}>
					<img className={styles.card__image} src={cardImage} alt="карточка товара" />
					<h2 className={styles.card__caption}>Манго Египет</h2>
				</Link>
				<span className={styles.card__price}>80 руб.</span>
				<span className={styles.card__weight}>1кг</span>
				<div className={styles['card__button-container']}>
					<button className={styles['card__cart-button']}>В корзину</button>
					<button className={styles['card__like-button']} />
				</div>
			</div>
		</li>
	);
};

export default ProductCard;
