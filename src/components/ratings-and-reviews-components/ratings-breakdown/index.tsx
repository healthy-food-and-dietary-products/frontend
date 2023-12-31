import React from 'react';
import plural from '../utils/pluralizer';
import styles from './ratings-breakdown.module.scss';

interface IRatingsBreakdown {
	ratings: number[];
}

const RatingsBreakdown: React.FC<IRatingsBreakdown> = ({ ratings }) => {
	const starsArray = [5, 4, 3, 2, 1];
	const sum = ratings.reduce((a, b) => a + b, 0);
	const amount = ratings.length;
	const average = (sum / amount).toFixed(1);
	const title = ['оценок', 'оценка', 'оценки'][plural(amount)];

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
							value={ratings.filter((el) => el === mark).length || 0}
							max={amount}
						/>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default RatingsBreakdown;
