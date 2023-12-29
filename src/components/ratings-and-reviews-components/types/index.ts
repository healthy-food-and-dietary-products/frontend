export interface IReview {
	id: number;
	author: string;
	product: string;
	score: number;
	pub_date: string;
	was_edited: boolean;
	text: string;
}
