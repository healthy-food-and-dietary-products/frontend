import React, { useState } from 'react';
import { Review as IReview } from '@services/generated-api/data-contracts';
import plural from '../utils/pluralizer';
import Review from '../review';
import styles from './reviews-list.module.scss';

interface IReviewsList {
	reviews: IReview[];
}

const ReviewsList: React.FC<IReviewsList> = ({ reviews }) => {
	const [itemsShown, setItemsShown] = useState(3);
	const amount = reviews.length;
	const title = ['отзывов', 'отзыв', 'отзыва'][plural(amount)];

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				{amount} {title}
			</p>
			<ul className={styles.list}>
				{reviews.slice(0, itemsShown).map((item) => (
					<li className={styles.item}>
						<Review review={item} />
					</li>
				))}
			</ul>
			{itemsShown < amount && (
				<button className={styles.button} onClick={() => setItemsShown(itemsShown + 3)}>
					Загрузить еще
				</button>
			)}
		</div>
	);
};

export default ReviewsList;
