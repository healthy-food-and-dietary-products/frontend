import React from 'react';
import styles from './ingredients-list-popup.module.scss';

type RecipeIngredientsProps = {
	ingredients: {
		amount: number;
		final_price: number;
		id: number;
		ingredient_photo: string;
		measure_unit: string;
		name: string;
		need_to_buy: number;
		quantity_in_recipe: number;
		quantity_in_recipe_measure?: string;
	}[];
};

const IngredientsListPopup: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
	return (
		<div className={styles['popup-ingredients']}>
			<p className={styles['popup-ingredients__title']}>Из рецепта:</p>
			<ul className={styles['popup-ingredients__list']}>
				{ingredients?.map((ingredient, index) => {
					return (
						<li className={styles['popup-ingredients__item']} key={index}>
							<span className={styles['popup-ingredients__name']}>
								{ingredient?.name}
							</span>
							<span className={styles['popup-ingredients__weight']}>
								{ingredient.quantity_in_recipe_measure}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default IngredientsListPopup;
