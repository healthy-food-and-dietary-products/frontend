import React, { useState } from 'react';
import styles from './recipe.module.scss';
import Breadcrumbs from '@components/breadcrumbs';
import IngredientsList from '@components/recipes-components/ingredients-list';
import { declOfNum } from '@utils/utils';
import clsx from 'clsx';
import api from '@services/api.ts';
import Preloader from '@components/preloader';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useCart } from '@hooks/use-cart-context';
import RecipeInfo from '@components/recipes-components/recipe-info';
import { usePopup } from '@hooks/use-popup';
import PopupRecipe from '@components/popups/popup-recipe';
import { translateMeasureUnit } from '@utils/utils';

type ReceipeIngredientInfoProps = {
	amount: number;
	final_price: number;
	id: number;
	ingredient_photo: string;
	measure_unit: string;
	name: string;
	need_to_buy: number;
	quantity_in_recipe: number;
	quantity_in_recipe_measure?: string;
};

type ReceipeInfoProps = {
	author: number;
	carbohydrates: number;
	cooking_time: number;
	fats: number;
	id: number;
	image: string;
	ingredients: ReceipeIngredientInfoProps[];
	kcal: number;
	name: string;
	proteins: number;
	text: string;
	total_ingredients?: number;
};

const Recipe: React.FC = () => {
	const { id } = useParams();
	const { handleOpenPopup } = usePopup();

	const [isLoading, setIsLoading] = useState(true);
	const [recipeInfo, setRecipeInfo] = useState<ReceipeInfoProps>(Object);
	const [recipeByLines, setRecipeByLines] = useState<string[]>(['']);
	const [numeralizeWord, setNumeralizeWord] = useState('');
	const { reset } = useCart();
	const [recipeNutrients, setRecipeNutrients] = useState({
		proteins: 0,
		fats: 0,
		carbonhydrates: 0,
		kcal: 0,
	});

	useEffect(() => {
		if (!id) {
			return;
		}

		const recipeId: number = parseInt(id, 10);
		const fetchReceiptAndProducts = async () => {
			const recipe: ReceipeInfoProps = await api.getRecipeById(recipeId);

			recipe.ingredients.map((ingredient, id) => {
				const ingredientMeasureUnit = ingredient.measure_unit;

				const { measureUnit, amount } = translateMeasureUnit(
					ingredientMeasureUnit,
					ingredient.amount
				);

				const { measureUnit: newMeasureUnit, amount: newAmount } = translateMeasureUnit(
					ingredientMeasureUnit,
					ingredient.quantity_in_recipe
				);

				recipe.ingredients[id].amount = amount;
				recipe.ingredients[id].measure_unit = measureUnit;
				recipe.ingredients[id].quantity_in_recipe = newAmount;
				recipe.ingredients[id].quantity_in_recipe_measure = `${
					newAmount + newMeasureUnit
				}`;
			});

			setRecipeByLines(recipe.text.split('\n'));
			setNumeralizeWord(declOfNum(recipe.cooking_time, ['минута', 'минуты', 'минут']));
			setRecipeInfo(recipe);
			setRecipeNutrients({
				proteins: recipe.proteins,
				fats: recipe.fats,
				carbonhydrates: recipe.carbohydrates,
				kcal: recipe.kcal,
			});
		};

		fetchReceiptAndProducts().finally(() => setIsLoading(false));
	}, [id]);

	const handleAddToCart = () => {
		reset();
		handleOpenPopup('openPopupRecipe');
	};

	return (
		<div className={styles.recipes}>
			{isLoading ? (
				<Preloader />
			) : (
				<div className={styles.recipes__container}>
					<Breadcrumbs productName={recipeInfo.name} />
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
								onClick={handleAddToCart}
							>
								Добавить все в корзину
							</button>
							<p className={styles['ingredients__text_small']}>
								* Продукты добавляются в корзину в минимальной фасовке, которая доступна
								для покупки
							</p>
						</div>
						<div className={styles.recipes__info}>
							<RecipeInfo img={recipeInfo.image} recipeNutrients={recipeNutrients} />
						</div>
					</div>
					<div className={clsx(styles.recipes__instructions, styles.instructions)}>
						<p className={styles.instructions__title}>Инструкция приготовления</p>
						<div className={styles.instructions__list}>
							{recipeByLines.map((line, index) => (
								<p key={index} className={styles.instructions__item}>
									{line}
								</p>
							))}
						</div>
					</div>
				</div>
			)}

			<PopupRecipe ingredients={recipeInfo.ingredients} />
		</div>
	);
};

export default Recipe;
