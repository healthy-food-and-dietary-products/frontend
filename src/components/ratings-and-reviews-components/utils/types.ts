import { Review } from '@services/generated-api/data-contracts';

export type TRating = number;

export interface IRatingsAndReviews {
	productId: number;
	rating: TRating;
	ratings: TRating[];
	review: Review;
	reviews: Review[];
	onRatingChange: (rating: TRating) => void;
	onAddReview: (review: Review) => void;
	onUpdateReview: (review: Review) => void;
}

export interface IReview extends Review {}

export type TReviewsNullable = null | Review[];

export type TReviewNullable = null | Review;

export type TRatingsNullable = null | number[];

export type TRatingNullable = null | number;
