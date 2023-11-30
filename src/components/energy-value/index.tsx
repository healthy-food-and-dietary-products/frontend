import clsx from 'clsx';
import styles from './energy-value.module.scss';

type Props = {
	kcal?: number;
	proteins?: number;
	fats?: number;
	carbohydrates?: number;
	className?: string;
};

export default function EnergyValue({
	kcal = 0,
	proteins = 0,
	fats = 0,
	carbohydrates = 0,
	className,
}: Props) {
	return (
		<div className={clsx(styles['energy-value'], className)}>
			<p className={styles['energy-value__item']}>
				<span>белки</span>
				<span>{`${proteins}г`}</span>
			</p>
			<p className={styles['energy-value__item']}>
				<span>жиры</span>
				<span>{`${fats}г`}</span>
			</p>
			<p className={styles['energy-value__item']}>
				<span>углеводы</span>
				<span>{`${carbohydrates}г`}</span>
			</p>
			<p className={styles['energy-value__item']}>
				<span>ккал</span>
				<span>{`${kcal}кКал`}</span>
			</p>
		</div>
	);
}
