import React from 'react';
import styles from './recipe.module.scss';
import Breadcrumbs from '@components/breadcrumbs';
import IngredientsList from '@components/recipes-components/ingredients-list';
import { declOfNum } from '@utils/utils';
import clsx from 'clsx';
import api from '@services/api.ts';
import Preloader from '@components/preloader';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import RecipeInfo from '@components/recipes-components/recipe-info';
import { usePopup } from '@hooks/use-popup';
import PopupRecipe from '@components/popups/popup-recipe';

type ReceipeIngredientInfoProps = {
	id: number;
	name: string;
	measure_unit: string;
	quantity: number;
	photo?: string;
	amount?: number;
	price?: number;
};

type ReceipeInfoProps = {
	id: number;
	author: number;
	name: string;
	text: string;
	image: string;
	ingredients: ReceipeIngredientInfoProps[];
	total_ingredients?: string;
	recipe_nutrients?: {
		proteins: number;
		fats: number;
		carbonhydrates: number;
		kcal: number;
	};
	cooking_time: number;
};

const Recipe: React.FC = () => {
	const { id } = useParams();
	const { handleOpenPopup } = usePopup();

	const [isLoading, setIsLoading] = React.useState(true);
	const [recipeInfo, setRecipeInfo] = React.useState<ReceipeInfoProps>(Object);
	const [numeralizeWord, setNumeralizeWord] = React.useState('');

	useEffect(() => {
		if (!id) {
			return;
		}

		const recipeId: number = parseInt(id, 10);
		const fetchReceiptAndProducts = async () => {
			const data = await api.getRecipeById(recipeId);
			setRecipeInfo(data);
			setNumeralizeWord(declOfNum(data.cooking_time, ['минута', 'минуты', 'минут']));

			const promises = data.ingredients.map((ingredient: ReceipeIngredientInfoProps) => {
				return api.productsRead(ingredient.id);
			});

			const newProducts = await Promise.all(promises);
			const filteredProducts = newProducts.filter((product) => product !== null);

			setRecipeInfo((prevReceipeInfo) => {
				filteredProducts.map((product) => {
					const index = prevReceipeInfo.ingredients.findIndex((i) => i.id == product.id);
					if (index === -1) {
						return;
					}

					prevReceipeInfo.ingredients[index].photo = product.photo;
					prevReceipeInfo.ingredients[index].amount = product.amount;
					prevReceipeInfo.ingredients[index].price = product.price;
				});

				return prevReceipeInfo;
			});
		};

		fetchReceiptAndProducts().finally(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.recipes}>
			{isLoading ? (
				<Preloader />
			) : (
				<div className={styles.recipes__container}>
					<Breadcrumbs isTall={true} />
					<div className={styles.recipes__content}>
						<div className={clsx(styles.recipes__ingredients, styles.ingredients)}>
							<h1 className={styles.ingredients__title}>{recipeInfo.name}</h1>
							<p className={styles.ingredients__text}>
								<span className={styles['ingredients__text_black']}>
									Время приготовления
								</span>{' '}
								<span>{`${recipeInfo.cooking_time} ${numeralizeWord}`}</span>
							</p>
							<div className={styles.ingredients__list}>
								<IngredientsList ingredients={recipeInfo.ingredients} />
							</div>
							<button
								className={styles.ingredients__button}
								type="button"
								onClick={() => handleOpenPopup('openPopupRecipe')}
							>
								Добавить все в корзину
							</button>
							<p className={styles['ingredients__text_small']}>
								* Продукты добавляются в корзину в минимальной фасовке, которая доступна
								для покупки
							</p>
						</div>
						<div className={styles.recipes__info}>
							<RecipeInfo
								img={recipeInfo.image}
								recipe_nutrients={recipeInfo.recipe_nutrients}
							/>
						</div>
						<div className={clsx(styles.recipes__instructions, styles.instructions)}>
							<p className={styles.instructions__title}>Инструкция приготовления</p>
							<div className={styles.instructions__list}>
								<p className={styles.instructions__item}>{recipeInfo.text}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<PopupRecipe ingredients={recipeInfo.ingredients} />
		</div>
	);
};

export default Recipe;
