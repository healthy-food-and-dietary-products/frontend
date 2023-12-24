import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useProfile } from '@hooks/use-profile';
import api from '@services/api';
import type { Category } from '@services/generated-api/data-contracts';
import styles from './catalog-promo.module.scss';

const CatalogPromo = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [numberToShow, setNumberToShow] = useState(6);
	const { isMobileScreen } = useProfile();

	const findNumbersToShow = useCallback(() => {
		if (isMobileScreen) {
			setNumberToShow(6);
			return;
		}

		setNumberToShow(5);
	}, [isMobileScreen]);

	useEffect(() => {
		findNumbersToShow();
	}, [findNumbersToShow, isMobileScreen]);

	const handleCategoryToggle = () => {
		if (numberToShow < 12) {
			setNumberToShow(12);
			return;
		}
		findNumbersToShow();
	};

	useEffect(() => {
		api.categoriesList().then((categories) => setCategories(categories));
	}, []);
	return (
		<>
			<ul className={styles.catalogPromo}>
				{categories.slice(0, numberToShow).map((category) => (
					<li key={category.id} className={styles.catalogPromo__item}>
						<Link className={styles.catalogPromo__link} to={`/catalog/${category.slug}`}>
							<figure className={styles.catalogPromo__innerContainer}>
								<img
									className={styles.catalogPromo__image}
									src={category.image}
									alt={`Категория: ${category.name}`}
								/>
								<figcaption className={styles.catalogPromo__title}>
									{category.name}
								</figcaption>
							</figure>
						</Link>
					</li>
				))}
			</ul>
			<div className={styles.catalogPromo__textContainer}>
				<p className={styles.catalogPromo__text} onClick={handleCategoryToggle}>
					{numberToShow < 12 ? 'Развернуть' : 'Свернуть'}
				</p>
				<span
					className={clsx(
						styles.catalogPromo__span,
						numberToShow === 12 && styles.catalogPromo__span_active
					)}
					onClick={handleCategoryToggle}
				></span>
			</div>
		</>
	);
};

export default CatalogPromo;
