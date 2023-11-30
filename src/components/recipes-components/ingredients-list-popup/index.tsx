import styles from './ingredients-list-popup.module.scss';

import { products as ingredients } from '@data/dataExamples';

export default function IngredientsListPopup() {
	return (
		<div className={styles['popup-ingredients']}>
			<p className={styles['popup-ingredients__title']}>Из рецепта:</p>
			<ul className={styles['popup-ingredients__list']}>
				{ingredients.map((ingredient) => (
					<li className={styles['popup-ingredients__item']} key={ingredient.cardName}>
						<span className={styles['popup-ingredients__name']}>
							{ingredient.cardName}
						</span>
						<span
							className={styles['popup-ingredients__weight']}
						>{`${ingredient.weight} ${ingredient.measure_unit}`}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
