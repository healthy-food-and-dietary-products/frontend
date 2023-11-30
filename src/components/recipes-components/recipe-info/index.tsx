import styles from './recipe-info.module.scss';
import EnergyValue from '@components/energy-value';

import Image from '@images/recipe.jpg';

const info = {
	description: 'Оладьи идеально подойдут в пост и для вегетарианцев.',
	photo: Image,
	kcal: 278,
	proteins: 8,
	fats: 1,
	carbohydrates: 60,
};

export default function RecipeInfo() {
	return (
		<div className={styles['recipe-info']}>
			<div className={styles['recipe-info__image']}>
				<img src={info.photo} alt={info.description} />
			</div>
			<p className={styles['recipe-info__description']}>{info.description}</p>
			<p className={styles['recipe-info__info']}>Энергетическая ценность на порцию</p>
			<EnergyValue {...info} />
		</div>
	);
}
