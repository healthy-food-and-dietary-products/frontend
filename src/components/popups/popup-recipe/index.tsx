import React from 'react';
import styles from './popup-recipe.module.scss';
import Popup from '@components/popup';
import { usePopup } from '@hooks/use-popup';
import IngredientsListPopup from '@components/recipes-components/ingredients-list-popup';
import ProductsListPopup from '@components/recipes-components/products-list-popup';

type RecipeIngredientsProps = {
	ingredients: {
		id: number;
		name: string;
		measure_unit: string;
		quantity: number;
		ingredient_photo: string;
		amount_of_pack: number;
		amount?: number;
		price?: number;
	}[];
};

const PopupRecipe: React.FC<RecipeIngredientsProps> = ({ ingredients }) => {
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
					<IngredientsListPopup ingredients={ingredients} />
					<ProductsListPopup ingredients={ingredients} />
				</div>
			</div>
		</Popup>
	);
};

export default PopupRecipe;
