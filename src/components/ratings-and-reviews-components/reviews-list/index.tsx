import React, { useState } from 'react';
import Review from '../review';
import plural from '../utils/pluralizer';
import { reviewsTitleOptions } from '../utils/constants';
import { IRatingsAndReviews } from '../utils/types';
import styles from './reviews-list.module.scss';

interface IReviewsList extends Pick<IRatingsAndReviews, 'reviews'> {}

const ReviewsList: React.FC<IReviewsList> = ({ reviews }) => {
	const [reviewsShown, setReviewsShown] = useState(3);
	const amount = reviews.length;
	const title = reviewsTitleOptions[plural(amount)];

	return (
		<div className={styles.container}>
			<p className={styles.title}>
				{amount} {title}
			</p>
			<ul className={styles.list}>
				{reviews.slice(0, reviewsShown).map((review) => (
					<li className={styles.item} key={review.id}>
						<Review review={review} />
					</li>
				))}
			</ul>
			{reviewsShown < amount && (
				<button
					className={styles.button}
					onClick={() => setReviewsShown(reviewsShown + 3)}
				>
					Загрузить еще
				</button>
			)}
		</div>
	);
};

export default ReviewsList;
