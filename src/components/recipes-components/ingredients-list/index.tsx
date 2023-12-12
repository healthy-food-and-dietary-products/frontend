import React from 'react';
import { declOfNum } from '@utils/utils';
import styles from './ingredients-list.module.scss';
import clsx from 'clsx';

type RecipeIngredientsProps = {
	ingredients: {
		id: number;
		name: string;
		measure_unit: string;
		quantity: number;
		photo?: string;
		amount?: number;
		price?: number;
	}[];
};

const IngredientsList: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
	const numOfIngredients = ingredients.length;
	const numeralizeWord = declOfNum(numOfIngredients, [
		'ингредиент',
		'ингредиента',
		'ингредиентов',
	]);

	return (
		<div className={styles.ingredients}>
			<p className={styles.ingredients__head}>
				{`${ingredients.length} ${numeralizeWord}`}
			</p>
			<div className={styles.ingredients__list}>
				{ingredients.map((ingredient, index) => {
					if (ingredient.measure_unit === 'items') {
						ingredient.measure_unit = 'шт';
					} else if (ingredient.measure_unit === 'grams') {
						ingredient.measure_unit = 'гр';
					} else if (ingredient.measure_unit === 'milliliters') {
						ingredient.measure_unit = 'мл';
					}
					return (
						<div key={index} className={clsx(styles.ingredients__item, ingredient)}>
							<div className={styles.ingredient__image}>
								<img src={ingredient?.photo as string} alt={ingredient.name as string} />
							</div>
							<p className={styles.ingredient__name}>{ingredient.name}</p>
							<p
								className={styles.ingredient__weight}
							>{`${ingredient?.amount} ${ingredient.measure_unit}`}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default IngredientsList;
