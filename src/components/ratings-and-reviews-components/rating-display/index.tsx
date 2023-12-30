import React from 'react';
import styles from './rating-display.module.scss';

const RatingDisplay: React.FC<{ rating: number }> = ({ rating }) => {
	const starsArray = [1, 2, 3, 4, 5];

	return (
		<ul className={styles.container}>
			{starsArray.map((el) => (
				<li key={el} className={`${styles.star} ${el <= rating && styles.active}`}></li>
			))}
		</ul>
	);
};

export default RatingDisplay;
