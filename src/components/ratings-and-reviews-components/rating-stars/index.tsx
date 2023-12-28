import React, { useState } from 'react';

import styles from './rating-stars.module.scss';

const RatingStars: React.FC<{ defaultRating: number }> = ({ defaultRating }) => {
	const [rating, setRating] = useState(defaultRating);
	const [hover, setHover] = useState(0);
	const starsArray = [1, 2, 3, 4, 5];

	return (
		<fieldset
			className={styles.container}
			// NOTE: Keep hover active while mouse in component
			onMouseLeave={() => setHover(0)}
		>
			{starsArray.map((el) => (
				<label key={el} className={styles.item}>
					<input
						className={styles.input}
						type="radio"
						name="rating"
						checked={el === rating}
						value={el}
						onChange={() => {
							setRating(el);
						}}
						// NOTE: Reset rating on click on the star, corresponding to current rating
						onClick={() => el === rating && setRating(0)}
					/>
					<span
						className={`${styles.star} ${el <= rating && styles.active} ${
							el <= hover && styles.hovered
						}`}
						onMouseEnter={() => setHover(el)}
					/>
				</label>
			))}
		</fieldset>
	);
};

export default RatingStars;
