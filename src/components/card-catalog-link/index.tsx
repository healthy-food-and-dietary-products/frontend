/* eslint-disable */
import clsx from 'clsx';
import ProductCard from '../product-card';
import styles from './card-catalog-link.module.scss';
import { Link } from 'react-router-dom';
import { Product } from '@services/generated-api/data-contracts';

type CardCatalogLinkProps = {
	title: string;
	category?: string;
	array: Product[] | { title: string; link: string; backgroundImage: string }[];
	type: 'single-row';
};

function CardCatalogLink({ title, array, type, category }: CardCatalogLinkProps) {
	return (
		<div className={styles['card-catalog-link']}>
			<div
				className={`${styles['card-catalog-link__title-container']} ${
					styles[`card-catalog-link__title-container_type_${type}`]
				}`}
			>
				<Link to={`/catalog/${category}`} className={styles.link}>
					<h2 className={styles['card-catalog-link__title']}>{title}</h2>
				</Link>
				<span className={styles['card-catalog-link__arrow']} />
			</div>
			<ul
				className={clsx(
					type === 'single-row' && styles['card-catalog-link__list-single']
				)}
			>
				{array.map((item: Record<string, any>, index: number) => (
					<li
						className={styles['card-catalog-link__list-item']}
						key={index}
						style={{ gridArea: item.gridArea }}
					>
						{type === 'single-row' && (
							<ProductCard
								cardName={item.name}
								price={item.price}
								weight={item.amount}
								cardImage={item.photo}
								category={category}
								idCard={item.id}
								measureUnit={item.measure_unit}
								is_favorited={item.is_favorited}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default CardCatalogLink;
