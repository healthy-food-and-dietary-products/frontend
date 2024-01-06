import React from 'react';
import { Review as IReview } from '@services/generated-api/data-contracts';
import RatingDisplay from '../rating-display';
import { dateOptions } from '../utils/constants';
import styles from './review.module.scss';

const Review: React.FC<{ review: IReview }> = ({ review }) => {
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
