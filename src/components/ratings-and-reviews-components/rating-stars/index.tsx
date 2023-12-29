import React, { useState } from 'react';

import styles from './rating-stars.module.scss';

interface IRatingStars {
	defaultRating: number;
}

const RatingStars: React.FC<IRatingStars> = ({ defaultRating }) => {
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
