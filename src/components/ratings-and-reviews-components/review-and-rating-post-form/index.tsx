import React, { SyntheticEvent, useEffect } from 'react';
import { Review } from '@services/generated-api/data-contracts';
import api from '@services/api';
import { useFormAndValidation } from '@hooks/use-form-and-validation';
import RatingInput from '@components/ratings-and-reviews-components/rating-input';
import Button from '@components/Button';
import { dateOptions } from '../utils/constants';
import styles from './review-and-rating-post-form.module.scss';

interface IReviewAndRatingPostForm {
	review: Review | null;
	productId: number;
	onAddReview: (review: Review) => void;
	onUpdateReview: (review: Review) => void;
}

const ReviewAndRatingPostForm: React.FC<IReviewAndRatingPostForm> = ({
	review,
	productId,
	onAddReview,
	onUpdateReview,
}) => {
	const { values, setValues, handleChange } = useFormAndValidation({
		text: review?.text || '',
		score: review?.score || 0,
	});

	useEffect(() => {
		review && setValues({ text: review?.text, score: review?.score });
	}, [review, productId, setValues]);

	const handleReviewSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		// TODO: Add error processing in catch block
		if (review?.score && values.text && values.text !== review?.text) {
			api
				.reviewsUpdate(productId, review.id, { text: values.text as string })
				.then((res) => onUpdateReview(res))
				.catch((err) => console.log(err));
		}
	};

	const handleRatingChange = (rating: number) => {
		// TODO: Add error processing in catch block
		if (!review || review?.score !== rating) {
			const apiPromise =
				review && review.score > 0
					? api
							.reviewsUpdate(productId, review.id, {
								score: rating,
							})
							.then((res) => {
								onUpdateReview(res);
								return res;
							})
					: api.reviewsCreate(productId, { score: rating }).then((res) => {
							onAddReview(res);
							return res;
					  });
			apiPromise
				.then(() => setValues({ ...values, score: rating }))
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{review ? 'Вы оценили товар ' : 'Оценить товар'}
				{review && (
					<time dateTime={review.pub_date}>
						{new Date(review.pub_date).toLocaleDateString('ru-RU', dateOptions as never)}
					</time>
				)}
			</h3>
			<RatingInput rating={values.score as number} onChange={handleRatingChange} />
			<form className={styles.form} noValidate onSubmit={handleReviewSubmit}>
				<textarea
					className={styles.input}
					name="text"
					placeholder="Ваш комментарий..."
					value={values.text}
					onChange={
						handleChange as unknown as (e: React.ChangeEvent<HTMLTextAreaElement>) => void
					}
				/>
				<Button
					buttonStyle="green-border-button__active"
					buttonText="Отправить"
					type="submit"
					disabled={!values.text}
				/>
			</form>
		</div>
	);
};

export default ReviewAndRatingPostForm;
