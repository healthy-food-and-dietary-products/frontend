import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import clsx from 'clsx';

import Breadcrumbs from '@components/breadcrumbs';
import Preloader from '@components/preloader';
import RecipeInfo from '@components/recipes-components/recipe-info';
import IngredientsList from '@components/recipes-components/ingredients-list';
import PopupRecipe from '@components/popups/popup-recipe';
import { useResize } from '@hooks/use-resize';

import type {
	ReceipeIngredient,
	ReceipeInfoProps,
} from '@components/recipes-components/types';
import type { Product } from '@services/generated-api/data-contracts';
import api from '@services/api.ts';
import { declOfNum } from '@utils/utils';
import { translateMeasureUnit } from '@utils/utils';
import { useCart } from '@hooks/use-cart-context';
import { usePopup } from '@hooks/use-popup';
import styles from './recipe.module.scss';

const Recipe: React.FC = () => {
	const { id } = useParams();
	const { handleOpenPopup, handleClosePopup } = usePopup();
	const { width } = useResize();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [recipeInfo, setRecipeInfo] = useState<ReceipeInfoProps>(Object);
	const [recipeByLines, setRecipeByLines] = useState<string[]>(['']);
	const [numeralizeWord, setNumeralizeWord] = useState('');
	const [productsIdAndCategories, setProductsIdAndCategories] = useState<
		(string | number | undefined)[][]
	>([[]]);
	const { reset } = useCart();
	const [recipeNutrients, setRecipeNutrients] = useState({
		proteins: 0,
		fats: 0,
		carbonhydrates: 0,
		kcal: 0,
	});
	const [ingredients, setIngredients] = useState<ReceipeIngredient[]>([
		{
			amount: 0,
			final_price: 0,
			id: 0,
			ingredient_photo: '',
			measure_unit: '',
			name: '',
			need_to_buy: 0,
			quantity_in_recipe: 0,
			quantity_in_recipe_measure: '',
		},
	]);

	const updateIngredientMeasureUnits = (ingredients: ReceipeIngredient[]) => {
		return ingredients.map((ingredient) => {
			const ingredientMeasureUnit = ingredient.measure_unit;
			const { measureUnit, amount } = translateMeasureUnit(
				ingredientMeasureUnit,
				ingredient.amount
			);

			const { measureUnit: newMeasureUnit, amount: newAmount } = translateMeasureUnit(
				ingredientMeasureUnit,
				ingredient.quantity_in_recipe
			);
			return {
				...ingredient,
				amount,
				measure_unit: measureUnit,
				quantity_in_recipe: newAmount,
				quantity_in_recipe_measure: `${newAmount} ${newMeasureUnit}`,
			};
		});
	};

	const getRecipeByLines = (recipeText: string) => {
		return recipeText.split('\n');
	};
	const getNumeralizeWord = (cookingTime: number) => {
		return declOfNum(cookingTime, ['минута', 'минуты', 'минут']);
	};
	const extractRecipeNutrients = (recipe: ReceipeInfoProps) => {
		return {
			proteins: recipe.proteins,
			fats: recipe.fats,
			carbonhydrates: recipe.carbohydrates,
			kcal: recipe.kcal,
		};
	};

	const fetchProducts = useCallback(async (products: ReceipeIngredient[]) => {
		const updatedProductsPromises = await products.map((product) => {
			return api.productsRead(product.id);
		});
		const updatedProducts: Product[] = await Promise.all(updatedProductsPromises);

		return updatedProducts.map((product) => {
			const categoryName = product.category?.category_slug;
			return [product.id, categoryName];
		});
	}, []);

	const handleClick = (
		id: number,
		idAndCategories: (string | number | undefined)[][] = productsIdAndCategories
	) => {
		for (const idAndCategory of idAndCategories) {
			if (idAndCategory.includes(id)) {
				handleClosePopup('openPopupRecipe');
				const id = idAndCategory[0];
				const category = idAndCategory[1];
				return navigate(`/catalog/${category}/${id}`);
			}
		}
	};

	useEffect(() => {
		if (!id) {
			return;
		}

		const recipeId: number = parseInt(id, 10);

		const fetchReceiptAndProducts = async () => {
			const recipe: ReceipeInfoProps = await api.getRecipeById(recipeId);

			const recipeByLines = getRecipeByLines(recipe.text);
			const numeralizeWord = getNumeralizeWord(recipe.cooking_time);
			const updatedIngredients = updateIngredientMeasureUnits(recipe.ingredients);
			const nutrients = extractRecipeNutrients(recipe);
			const fetchedProductsIdAndCategories = await fetchProducts(updatedIngredients);

			if (fetchedProductsIdAndCategories !== undefined) {
				setProductsIdAndCategories(fetchedProductsIdAndCategories);
			}
			setRecipeInfo(recipe);
			setRecipeByLines(recipeByLines);
			setNumeralizeWord(numeralizeWord);
			setIngredients(updatedIngredients);
			setRecipeNutrients(nutrients);
		};

		fetchReceiptAndProducts().finally(() => setIsLoading(false));
	}, [fetchProducts, id]);

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
							<h1
								className={`${styles.ingredients__title} ${styles.ingredients__title_s}`}
							>
								{recipeInfo.name}
							</h1>
							<p className={`${styles.ingredients__text} ${styles.ingredients__text_s}`}>
								<span className={styles['ingredients__text_black']}>
									Время приготовления
								</span>{' '}
								<span>{`${recipeInfo.cooking_time} ${numeralizeWord}`}</span>
							</p>
							<div className={styles.ingredients__list}>
								<IngredientsList handleClick={handleClick} ingredients={ingredients} />
							</div>
							<button
								className={styles.ingredients__button}
								type="button"
								onClick={handleAddToCart}
							>
								Добавить в корзину
							</button>
							<p className={styles['ingredients__text_small']}>
								* Продукты добавляются в корзину в минимальной фасовке, которая доступна
								для покупки
							</p>
						</div>
						<div className={styles.recipes__info}>
							{width <= 768 && (
								<div className={styles.recipes__title}>
									<h1 className={styles.ingredients__title}>{recipeInfo.name}</h1>
									<p className={styles.ingredients__text}>
										<span className={styles['ingredients__text_black']}>
											Время приготовления
										</span>{' '}
										<span>{`${recipeInfo.cooking_time} ${numeralizeWord}`}</span>
									</p>
								</div>
							)}
							<RecipeInfo
								img={recipeInfo.image}
								recipeNutrients={recipeNutrients}
								description={recipeByLines[1]}
							/>
						</div>
					</div>
					<div className={clsx(styles.recipes__instructions, styles.instructions)}>
						<p className={styles.instructions__title}>Инструкция по приготовлению</p>
						<div className={styles.instructions__list}>
							{recipeByLines.slice(2).map((line, index) => (
								<p key={index} className={styles.instructions__item}>
									{line}
								</p>
							))}
						</div>
					</div>
				</div>
			)}

			<PopupRecipe handleClick={handleClick} ingredients={ingredients} />
		</div>
	);
};

export default Recipe;
