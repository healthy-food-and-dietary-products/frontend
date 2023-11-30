import styles from './popup-recipe.module.scss';
import Popup from '@components/popup';
import { usePopup } from '@hooks/use-popup';
import IngredientsListPopup from '@components/recipes-components/ingredients-list-popup';
import ProductsListPopup from '@components/recipes-components/products-list-popup';

export default function PopupRecipe() {
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
					<IngredientsListPopup />
					<ProductsListPopup />
				</div>
			</div>
		</Popup>
	);
}
