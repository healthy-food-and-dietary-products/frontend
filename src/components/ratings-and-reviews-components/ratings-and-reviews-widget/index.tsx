import React, { useEffect, useState } from 'react';
import api from '@services/api';
import { Review } from '@services/generated-api/data-contracts';
import ReviewAndRatingPostForm from '../review-and-rating-post-form';
import RatingsBreakdown from '../ratings-breakdown';
import ReviewsList from '../reviews-list';
import styles from './ratings-and-reviews-widget.module.scss';

interface IRatingsAndReviewsWidget {
	productId: number;
}

const RatingsAndReviewsWidget: React.FC<IRatingsAndReviewsWidget> = ({ productId }) => {
	const [reviews, setReviews] = useState<null | Review[]>(null);
	const [userReview, setUserReview] = useState<null | Review>(null);
	const [reviewsWithText, setReviewsWithText] = useState<null | Review[]>(null);
	const [ratings, setRatings] = useState<null | number[]>(null);
	const [hasOrderedThis, setHasOrderedThis] = useState(false);
	const [userId, setUserId] = useState<null | number>(null);

	useEffect(() => {
		api
			.usersMeRead()
			.then((res) => setUserId(res.id))
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		api
			.reviewsList(productId)
			.then((res) => {
				res[0] &&
					res.sort(function (a: Review, b: Review) {
						return Number(new Date(b.pub_date)) - Number(new Date(a.pub_date));
					});
				setReviews(res[0] ? res : null);
			})
			.catch((err) => console.log(err));
		api
			.productsOrderCheck(productId)
			.then((res) => setHasOrderedThis(res.ordered))
			.catch((err) => console.log(err));
	}, [productId]);

	useEffect(() => {
		if (reviews) {
			const filtered = reviews.filter((item: Review) => !!item.text);
			const ratings = reviews.map((item: Review) => item.score);
			const userReview = reviews.find((item: Review) => item.author.id === userId);
			setReviewsWithText(filtered[0] ? filtered : null);
			setRatings(ratings[0] ? ratings : null);
			setUserReview(userReview || null);
		}
	}, [reviews, userId]);

	const handleAddReview = (review: Review) => {
		setUserReview(review);
		setReviews(reviews ? [review, ...reviews] : [review]);
	};

	const handleUpdateReview = (review: Review) => {
		setUserReview(review);
		const newReviews = reviews
			?.slice()
			.map((item) => (item.id === review.id ? review : item));
		setReviews(newReviews || null);
	};

	return (
		(hasOrderedThis || reviews) && (
			<section className={styles.section} id="ratings-and-reviews">
				<h2 className={styles.title}>Отзывы</h2>
				<div className={styles.grid}>
					{hasOrderedThis && (
						<div className={styles.form}>
							<ReviewAndRatingPostForm
								review={userReview}
								productId={productId}
								onAddReview={handleAddReview}
								onUpdateReview={handleUpdateReview}
							/>
						</div>
					)}
					{ratings && (
						<React.Fragment>
							{reviewsWithText && (
								<div className={styles.reviews}>
									<ReviewsList reviews={reviewsWithText} />
								</div>
							)}

							<div className={styles.ratings}>
								<RatingsBreakdown ratings={ratings} />
							</div>
						</React.Fragment>
					)}
				</div>
			</section>
		)
	);
};

export default RatingsAndReviewsWidget;
