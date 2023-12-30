import React, { SyntheticEvent } from 'react';
import { IReview } from '../types';
import api from '@services/api';
import { useFormAndValidation } from '@hooks/use-form-and-validation';
import RatingStars from '@components/ratings-and-reviews-components/rating-stars';
import Button from '@components/Button';
import styles from './review-and-rating-post-form.module.scss';

const ReviewAndRatingPostForm: React.FC<{
	defaultReview: IReview | null;
	productId: number;
}> = ({ defaultReview, productId }) => {
	const { values, setValues, handleChange } = useFormAndValidation({
		text: defaultReview?.text || '',
		score: defaultReview?.score || 0,
	});

	// useEffect(() => {
	// 	// NOTE: Temporary output of product ID
	// 	console.log(productId, defaultReview);
	// 	defaultReview &&
	// 		setValues({ text: defaultReview?.text, score: defaultReview?.score });
	// }, [defaultReview, productId, setValues]);

	const handleReviewSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		// TODO: Fix then
		// TODO: Fix catch
		if (defaultReview?.score && values.text && values.text !== defaultReview?.text) {
			api
				.reviewsUpdate(productId, defaultReview.id, { text: values.text as string })
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
			console.log('submited');
		}
	};

	const handleRatingChange = (rating: number) => {
		// TODO: Fix then
		// TODO: Fix catch
		if (!defaultReview || defaultReview?.score !== rating) {
			const apiPromise =
				defaultReview && defaultReview.score > 0
					? api.reviewsUpdate(productId, defaultReview.id, {
							score: rating,
					  })
					: api.reviewsCreate(productId, { score: rating });
			apiPromise
				.then((res) => console.log(res))
				.then(() => setValues({ ...values, score: rating }))
				.catch((err) => console.log(err));
		}
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{defaultReview ? `Вы оценили товар ${defaultReview.pub_date}` : 'Оценить товар'}
			</h3>
			<RatingStars rating={values.score as number} onChange={handleRatingChange} />
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
