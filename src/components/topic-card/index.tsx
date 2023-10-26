import { Link } from 'react-router-dom';
import cardImage from '@images/pancakes.png';
import styles from './topic-card.module.scss';

type TopicCardProps = {
	cardName: string;
	cardDescription: string;
	cardDate: string;
	// добавить в пропсы cardImage когда будет готов массив карточек блога и рецептов
	// cardImage: string;
};
const TopicCard = ({ cardName, cardDescription, cardDate }: TopicCardProps) => {
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
						<p className={styles.card__date}>{cardDate}</p>
						<h2 className={styles.card__title}>{cardName}</h2>
						<p className={styles.card__description}>{cardDescription}</p>
					</figcaption>
				</figure>
			</Link>
		</li>
	);
};

export default TopicCard;
