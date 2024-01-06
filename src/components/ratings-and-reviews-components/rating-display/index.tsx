import React from 'react';
import { starsArray } from '../utils/constants';
import { IRatingsAndReviews } from '../utils/types';
import styles from './rating-display.module.scss';

interface IRatingDisplay extends Pick<IRatingsAndReviews, 'rating'> {}

const RatingDisplay: React.FC<IRatingDisplay> = ({ rating }) => {
	return (
		<ul className={styles.container}>
			{starsArray.map((mark) => (
				<li
					key={mark}
					className={`${styles.star} ${mark <= rating && styles.active}`}
				></li>
			))}
		</ul>
	);
};

export default RatingDisplay;
