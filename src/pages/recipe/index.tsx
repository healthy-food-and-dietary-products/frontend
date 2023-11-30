import styles from './recipe.module.scss';
import Breadcrumbs from '@components/breadcrumbs';
import IngredientsList from '@components/recipes-components/ingredients-list';
import { declOfNum } from '@utils/utils';
import clsx from 'clsx';
import RecipeInfo from '@components/recipes-components/recipe-info';
import { usePopup } from '@hooks/use-popup';
import PopupRecipe from '@components/popups/popup-recipe';

const title = 'Оладьи без яиц';
const cookingTime = 30;
const instructions = [
	'Разводим в тёплой воде дрожжи. Добавляем сахар, соль, муку. Замешиваем тесто.',
	'Когда тесто поднимется, неперемешивая, выкладываем его ложкой на раскалённую сковороду с растительным маслом. Обжариваем оладьи с обеих сторон.',
];

export default function Recipe() {
	const { handleOpenPopup } = usePopup();
	const numeralizeWord = declOfNum(cookingTime, ['минута', 'минуты', 'минут']);
	return (
		<div className={styles.recipes}>
			<div className={styles.recipes__container}>
				<Breadcrumbs isTall={true} />
				<div className={styles.recipes__content}>
					<div className={clsx(styles.recipes__ingredients, styles.ingredients)}>
						<h1 className={styles.ingredients__title}>{title}</h1>
						<p className={styles.ingredients__text}>
							<span className={styles['ingredients__text_black']}>
								Время приготовления
							</span>{' '}
							<span>{`${cookingTime} ${numeralizeWord}`}</span>
						</p>
						<div className={styles.ingredients__list}>
							<IngredientsList />
						</div>
						<button
							className={styles.ingredients__button}
							type="button"
							onClick={() => handleOpenPopup('openPopupRecipe')}
						>
							Добавить все в корзину
						</button>
						<p className={styles['ingredients__text_small']}>
							* Продукты добавляются в корзину в минимальной фасовке, которая доступна для
							покупки
						</p>
					</div>
					<div className={styles.recipes__info}>
						<RecipeInfo />
					</div>
					<div className={clsx(styles.recipes__instructions, styles.instructions)}>
						<p className={styles.instructions__title}>Инструкция приготовления</p>
						<ol className={styles.instructions__list}>
							{instructions.map((instruction) => (
								<li className={styles.instructions__item} key={instruction}>
									{instruction}
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
			<PopupRecipe />
		</div>
	);
}
