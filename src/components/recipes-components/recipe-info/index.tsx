import styles from './recipe-info.module.scss';
import EnergyValue from '@components/energy-value';
import { useParams } from 'react-router';

type RecipeInfoProps = {
	img: string;
	recipeNutrients: {
		proteins: number;
		fats: number;
		carbonhydrates: number;
		kcal: number;
	};
};

const RecipeInfo: React.FC<RecipeInfoProps> = ({ img, recipeNutrients }) => {
	const { id } = useParams();
	return (
		<div className={styles['recipe-info']}>
			<div className={styles['recipe-info__image']}>
				<img src={img} alt={id} />
			</div>
			<p className={styles['recipe-info__info']}>Энергетическая ценность на порцию</p>
			<EnergyValue {...recipeNutrients} />
		</div>
	);
};

export default RecipeInfo;
