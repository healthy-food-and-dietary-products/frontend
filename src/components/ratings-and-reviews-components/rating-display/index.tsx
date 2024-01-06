import React from 'react';
import { starsArray } from '../utils/constants';
import styles from './rating-display.module.scss';

const RatingDisplay: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<ul className={styles.container}>
			{starsArray.map((element) => (
				<li
					key={element}
					className={`${styles.star} ${element <= rating && styles.active}`}
				></li>
			))}
		</ul>
	);
};

export default RatingDisplay;
