import React, { SyntheticEvent, useEffect } from 'react';
import api from '@services/api';
import { useFormAndValidation } from '@hooks/use-form-and-validation';
import RatingInput from '@components/ratings-and-reviews-components/rating-input';
import Button from '@components/button';
import { dateOptions } from '../utils/constants';
import { IRatingsAndReviews, IReview, TRating, TReviewNullable } from '../utils/types';
import styles from './review-and-rating-post-form.module.scss';

interface IReviewAndRatingPostForm
	extends Pick<IRatingsAndReviews, 'productId' | 'onAddReview' | 'onUpdateReview'> {
	review: TReviewNullable;
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

	const handleReviewUpdate = (res: IReview) => {
		onUpdateReview(res);
		return res;
	};

	const handleReviewCreate = (res: IReview) => {
		onAddReview(res);
		return res;
	};

	const handleReviewSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		// TODO: Add error processing in catch block
		if (review?.score && values.text && values.text !== review?.text) {
			api
				.reviewsUpdate(productId, review.id, { text: values.text } as Pick<
					IReview,
					'text'
				>)
				.then(handleReviewUpdate)
				.catch((err) => console.log(err));
		}
	};

	const handleRatingChange = (rating: TRating) => {
		if (review?.score === rating) return;

		const updateReview =
			review && review.score > 0
				? api
						.reviewsUpdate(productId, review.id, {
							score: rating,
						})
						.then(handleReviewUpdate)
				: api.reviewsCreate(productId, { score: rating }).then(handleReviewCreate);

		// TODO: Add error processing in catch block
		updateReview
			.then(() => setValues({ ...values, score: rating }))
			.catch((err) => console.log(err));
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
			<RatingInput rating={values.score as TRating} onRatingChange={handleRatingChange} />
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
