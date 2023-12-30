import React from 'react';
import { Review as IReview } from '@services/generated-api/data-contracts';
import styles from './review.module.scss';
import RatingDisplay from '../rating-display';

const dateOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };

const Review: React.FC<{ review: IReview }> = ({ review }) => {
	return (
		<article className={styles.container}>
			<div className={styles.info}>
				<h4 className={styles.title}>
					<span>{review.author}</span>
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
