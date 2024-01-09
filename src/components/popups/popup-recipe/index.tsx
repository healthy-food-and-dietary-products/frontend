import React from 'react';
import Popup from '@components/popup';
import IngredientsListPopup from '@components/recipes-components/ingredients-list-popup';
import ProductsListPopup from '@components/recipes-components/products-list-popup';
import type { RecipeIngredientsProps } from '@components/recipes-components/types';
import { usePopup } from '@hooks/use-popup';
import styles from './popup-recipe.module.scss';

const PopupRecipe: React.FC<RecipeIngredientsProps> = ({ ingredients, handleClick }) => {
	const {
		popupState: { openPopupRecipe },
		handleClosePopup,
	} = usePopup();
	return (
		<Popup
			openPopup={openPopupRecipe}
			onClickClose={() => handleClosePopup('openPopupRecipe')}
		>
			<div className={styles['popup-recipe']}>
				<h1 className={styles['popup-recipe__title']}>
					Выберите товары для добавления в корзину
				</h1>
				<div className={styles['popup-recipe__content']}>
					<IngredientsListPopup handleClick={handleClick} ingredients={ingredients} />
					<ProductsListPopup handleClick={handleClick} ingredients={ingredients} />
				</div>
			</div>
		</Popup>
	);
};

export default PopupRecipe;
