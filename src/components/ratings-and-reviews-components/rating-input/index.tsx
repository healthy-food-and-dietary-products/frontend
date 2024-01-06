import React, { useState } from 'react';
import { starsArray } from '../utils/constants';
import styles from './rating-input.module.scss';

interface RatingInput {
	rating: number;
	onChange: (rating: number) => void;
}

const RatingInput: React.FC<RatingInput> = ({ rating, onChange }) => {
	const [hover, setHover] = useState(0);

	return (
		<fieldset
			className={styles.container}
			// NOTE: Keep hover active while mouse in component
			onMouseLeave={() => setHover(0)}
		>
			{starsArray.map((element) => (
				<label key={element} className={styles.item}>
					<input
						className={styles.input}
						type="radio"
						name="rating"
						value={element}
						onChange={() => onChange(element)}
						checked={element === rating}
					/>
					<span
						className={`${styles.star} ${element <= rating && styles.active} ${
							element <= hover && styles.hovered
						}`}
						onMouseEnter={() => setHover(element)}
					/>
				</label>
			))}
		</fieldset>
	);
};

export default RatingInput;
