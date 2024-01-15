import React from 'react';
import api from '@services/api.ts';
import Preloader from '@components/preloader';
import Breadcrumbs from '@components/breadcrumbs';
import TopicCard from '@components/topic-card';
import type { Recipe } from '@services/generated-api/data-contracts';
import styles from './receipt-list.module.scss';

const RecipeList: React.FC = () => {
	const [isLoading, setIsLoading] = React.useState(true);
	const [recipeList, setRecipeList] = React.useState<Recipe[]>([]);

	React.useEffect(() => {
		setIsLoading(true);
		api
			.recipesList()
			.then((data) => {
				setRecipeList(data);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<section className={styles.recipelist}>
			{isLoading ? (
				<Preloader />
			) : (
				<div className={styles.recipelist__container}>
					<Breadcrumbs />
					<h2 className={styles.recipelist__title}>Рецепты</h2>
					<div className={styles.recipe__table}>
						{recipeList.map((recipeCard) => {
							return <TopicCard key={recipeCard.id} recipe={recipeCard}></TopicCard>;
						})}
					</div>
				</div>
			)}
		</section>
	);
};

export default RecipeList;
