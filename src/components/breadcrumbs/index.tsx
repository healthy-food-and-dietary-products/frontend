import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './breadcrumbs.module.scss';

type BreadcrumbsProps = {
	productName?: string;
	category?: {
		category_name: string;
		category_slug: string;
	};
	isTall?: boolean;
};

type Categories = {
	catalog: string;
	profile: string;
	cart: string;
	addresses: string;
	favorites: string;
	recipes: string;
	contacts: string;
	orders: string;
	[key: string]: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName, category, isTall }) => {
	const categories: Categories = {
		catalog: 'Каталог товаров',
		profile: 'Личный кабинет',
		cart: 'Корзина',
		addresses: 'Мои адреса',
		favorites: 'Избранное',
		recipes: 'Рецепты',
		contacts: 'Контакты',
		orders: 'Мои заказы',
	};

	if (category) {
		categories[category.category_slug] = category.category_name;
	}

	const location = useLocation();
	const translatedPathnames = location.pathname.split('/').map((path) => {
		if (Object.keys(categories).includes(path)) {
			return (path = categories[path]);
		}

		return null;
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
						{name || ' '}
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
