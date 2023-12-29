import React, { SyntheticEvent, useEffect } from 'react';
import { IReview } from '../types';
import { useFormAndValidation } from '@hooks/use-form-and-validation';
import RatingStars from '@components/ratings-and-reviews-components/rating-stars';
import Button from '@components/Button';
import styles from './review-and-rating-post-form.module.scss';

const ReviewAndRatingPostForm: React.FC<{
	defaultReview: IReview | null;
	productId: number;
}> = ({ defaultReview, productId }) => {
	const { values, setValues, handleChange } = useFormAndValidation({
		text: '',
	});

	useEffect(() => {
		// NOTE: Temporary output of product ID
		console.log(productId, defaultReview);
		defaultReview && setValues({ text: defaultReview?.text });
	}, [defaultReview, productId, setValues]);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log('submited');
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{defaultReview ? `Вы оценили товар ${defaultReview.pub_date}` : 'Оценить товар'}
			</h3>
			{/* // NOTE: Rating is handling it's api */}
			<RatingStars defaultRating={(values.score as number) || 0} />
			<form className={styles.form} noValidate onSubmit={handleSubmit}>
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
