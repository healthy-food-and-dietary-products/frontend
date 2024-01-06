import React, { useState } from 'react';
import { starsArray } from '../utils/constants';
import { IRatingsAndReviews } from '../utils/types';
import styles from './rating-input.module.scss';

interface IRatingInput extends Pick<IRatingsAndReviews, 'rating' | 'onRatingChange'> {}

const RatingInput: React.FC<IRatingInput> = ({ rating, onRatingChange }) => {
	const [hover, setHover] = useState(0);

	return (
		<fieldset
			className={styles.container}
			// NOTE: Keep hover active while mouse in component
			onMouseLeave={() => setHover(0)}
		>
			{starsArray.map((mark) => (
				<label key={mark} className={styles.item}>
					<input
						className={styles.input}
						type="radio"
						name="rating"
						value={mark}
						onChange={() => onRatingChange(mark)}
						checked={mark === rating}
					/>
					<span
						className={`${styles.star} ${mark <= rating && styles.active} ${
							mark <= hover && styles.hovered
						}`}
						onMouseEnter={() => setHover(mark)}
					/>
				</label>
			))}
		</fieldset>
	);
};

export default RatingInput;
