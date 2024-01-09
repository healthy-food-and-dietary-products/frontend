import React from 'react';
import type { RecipeIngredientsProps } from '../types';
import styles from './ingredients-list-popup.module.scss';

const IngredientsListPopup: React.FC<RecipeIngredientsProps> = ({
	ingredients,
	handleClick,
}) => {
	return (
		<div className={styles['popup-ingredients']}>
			<p className={styles['popup-ingredients__title']}>Из рецепта:</p>
			<ul className={styles['popup-ingredients__list']}>
				{ingredients?.map((ingredient, index) => {
					return (
						<li className={styles['popup-ingredients__item']} key={index}>
							<span
								onClick={() => handleClick(ingredient.id)}
								className={styles['popup-ingredients__name']}
							>
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
