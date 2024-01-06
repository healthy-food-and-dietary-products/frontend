import React from 'react';
import plural from '../utils/pluralizer';
import { starsArray, ratingsTitleOptions } from '../utils/constants';
import styles from './ratings-breakdown.module.scss';

interface IRatingsBreakdown {
	ratings: number[];
}

const RatingsBreakdown: React.FC<IRatingsBreakdown> = ({ ratings }) => {
	const sum = ratings.reduce((a, b) => a + b, 0);
	const amount = ratings.length;
	const average = (sum / amount).toFixed(1);
	const title = ratingsTitleOptions[plural(amount)];

	return (
		<aside className={styles.container}>
			<div className={styles.average}>
				<div className={styles.bigStar} />
				<span>{average}</span>
			</div>
			<h4 className={styles.title}>
				{amount} {title}
			</h4>
			<ul className={styles.list}>
				{starsArray.map((mark) => (
					<li key={mark} className={styles.item}>
						<div className={styles.mark}>
							<div className={styles.smallStar} />
							<span>{mark}</span>
						</div>
						<progress
							className={styles.progress}
							value={ratings.filter((element) => element === mark).length || 0}
							max={amount}
						/>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default RatingsBreakdown;
