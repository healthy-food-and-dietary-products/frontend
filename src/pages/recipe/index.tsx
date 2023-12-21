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

type ReceipeIngredientInfoProps = {
	id: number;
	name: string;
	measure_unit: string;
	quantity: number;
	ingredient_photo: string;
	amount_of_pack: number;
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

	const [isLoading, setIsLoading] = useState(true);
	const [recipeInfo, setRecipeInfo] = useState<ReceipeInfoProps>(Object);
	const [recipeByLines, setRecipeByLines] = useState<string[]>(['']);
	const [numeralizeWord, setNumeralizeWord] = useState('');
	const { reset } = useCart();

	useEffect(() => {
		if (!id) {
			return;
		}

		const recipeId: number = parseInt(id, 10);
		const fetchReceiptAndProducts = async () => {
			const recipe = await api.getRecipeById(recipeId);
			setRecipeByLines(recipe.text.split('\n'));
			setNumeralizeWord(declOfNum(recipe.cooking_time, ['минута', 'минуты', 'минут']));

			const promises = recipe.ingredients.map(
				(ingredient: ReceipeIngredientInfoProps) => {
					return api.productsRead(ingredient.id);
				}
			);

			const newProducts = await Promise.all(promises);
			const filteredProducts = newProducts.filter((product) => product !== null);

			const addFieldsToRecipe = (prevReceipe: ReceipeInfoProps) => {
				filteredProducts.map((product) => {
					const index = prevReceipe.ingredients.findIndex((i) => i.id == product.id);
					if (index === -1) {
						return;
					}
					prevReceipe.ingredients[index].amount = product.amount;
					prevReceipe.ingredients[index].price = product.price;
					prevReceipe.ingredients[index].amount_of_pack = Math.ceil(
						prevReceipe.ingredients[index].quantity / product.amount
					);
				});

				return prevReceipe;
			};

			setRecipeInfo(addFieldsToRecipe(recipe));
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
							<RecipeInfo
								img={recipeInfo.image}
								recipe_nutrients={recipeInfo.recipe_nutrients}
							/>
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
