import { Link } from 'react-router-dom';
import cardImage from '@images/pancakes.png';
import styles from './topic-card.module.scss';
const TopicCard = () => {
	return (
		<li className={styles.card}>
			{/* вместо /login подставить нужный роут  */}
			<Link className={styles.card__link} to="/login">
				<figure className={styles['card__image-container']}>
					<img
						className={styles.card__image}
						src={cardImage}
						alt="карточка блога и рецептов"
					/>
					<figcaption className={styles['card__text-container']}>
						<p className={styles.card__date}>29 окт. 2023</p>
						<h2 className={styles.card__title}>Оладьи без яиц</h2>
						<p className={styles.card__description}>
							Простой рецепт для уютного завтрака с семьёй.
						</p>
					</figcaption>
				</figure>
			</Link>
		</li>
	);
};

export default TopicCard;
