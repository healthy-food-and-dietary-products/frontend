import React from 'react';
import RatingDisplay from '../rating-display';
import { dateOptions } from '../utils/constants';
import { IRatingsAndReviews } from '../utils/types';
import styles from './review.module.scss';

interface IReview extends Pick<IRatingsAndReviews, 'review'> {}

const Review: React.FC<IReview> = ({ review }) => {
	return (
		<article className={styles.container}>
			<div className={styles.info}>
				<h4 className={styles.title}>
					<span>{review.author.username}</span>
					<time dateTime={review.pub_date}>
						{new Date(review.pub_date).toLocaleDateString('ru-RU', dateOptions as never)}
					</time>
				</h4>
				<RatingDisplay rating={review.score} />
			</div>
			<p className={styles.text}>{review.text}</p>
		</article>
	);
};

export default Review;
