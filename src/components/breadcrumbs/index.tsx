import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import api from '@services/api';
import type { Category } from '@services/generated-api/data-contracts';
import styles from './breadcrumbs.module.scss';

type BreadcrumbsProps = {
	productName?: string;
	isTall?: boolean;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName, isTall }) => {
	const [categories, setCategories] = useState<Record<string, string>>({
		catalog: 'Каталог товаров',
		profile: 'Личный кабинет',
		cart: 'Корзина',
		addresses: 'Мои адреса',
		favorites: 'Избранное',
		user: 'Пользователь',
	});

	useEffect(() => {
		const translatedCategoriesObject: Record<string, string> = {};
		api.categoriesList().then((categories: Category[]) => {
			categories.map((category) => {
				const categoryRussianName = category.name.trim();

				if (category.slug) {
					return (translatedCategoriesObject[category.slug] = categoryRussianName);
				}
				return category;
			});
			setCategories((prevState) => ({ ...prevState, ...translatedCategoriesObject }));
		});
	}, []);

	const location = useLocation();
	const translatedPathnames = location.pathname.split('/').map((path) => {
		if (Object.keys(categories).includes(path)) {
			return (path = categories[path]);
		}

		return path;
	});

	const breadcrumbsArray = ['Главная', ...translatedPathnames.slice(1)];

	return (
		<div
			className={clsx(styles.breadcrumbs, {
				[styles.breadcrumbs_type_tall]: isTall,
			})}
		>
			{breadcrumbsArray.map((name, index, arr) => {
				const routeTo =
					index === 0
						? '/'
						: `${location.pathname
								.split('/')
								.slice(0, index + 1)
								.join('/')}`;
				const isLast = index === arr.length - 1;
				return isLast ? (
					<span className={styles.breadcrumbs__last} key={name}>
						{productName !== undefined ? productName : name}
					</span>
				) : (
					<Link className={styles.breadcrumbs__item} key={name} to={routeTo}>
						{name}
						<span
							onClick={(e) => e.preventDefault()}
							className={styles.breadcrumbs__arrow}
						/>
					</Link>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
