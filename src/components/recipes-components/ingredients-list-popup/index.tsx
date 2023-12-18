import React from 'react';
import styles from './ingredients-list-popup.module.scss';

type RecipeIngredientsProps = {
	ingredients: {
		id: number;
		name: string;
		measure_unit: string;
		quantity: number;
		photo?: string;
		amount?: number;
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
							<span
								className={styles['popup-ingredients__weight']}
							>{`${ingredient?.quantity} ${ingredient?.measure_unit}`}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default IngredientsListPopup;
