import React, { useState } from 'react';
import styles from './rating-input.module.scss';

interface RatingInput {
	rating: number;
	onChange: (rating: number) => void;
}

const RatingInput: React.FC<RatingInput> = ({ rating, onChange }) => {
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
						value={el}
						onChange={() => onChange(el)}
						checked={el === rating}
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

export default RatingInput;
