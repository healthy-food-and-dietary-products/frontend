import { declOfNum } from '@utils/utils';
import styles from './ingredients-list.module.scss';
import clsx from 'clsx';

import { products as ingredients } from '@data/dataExamples';

export default function IngredientsList() {
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
				{ingredients.map((ingredient, index) => (
					<div key={index} className={clsx(styles.ingredients__item, ingredient)}>
						<div className={styles.ingredient__image}>
							<img
								src={ingredient.cardImage as string}
								alt={ingredient.cardName as string}
							/>
						</div>
						<p className={styles.ingredient__name}>{ingredient.cardName}</p>
						<p
							className={styles.ingredient__weight}
						>{`${ingredient.weight} ${ingredient.measure_unit}`}</p>
					</div>
				))}
			</div>
		</div>
	);
}
