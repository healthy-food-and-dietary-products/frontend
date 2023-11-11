/* eslint-disable @typescript-eslint/no-explicit-any */
import { splitIntoSubArrays } from '../../utils/utils';
import CardBlockLink from '../card-block-link';
import ProductCard from '../product-card';
import styles from './card-catalog-link.module.scss';
import { Link } from 'react-router-dom';

type CardCatalogLinkProps = {
	title: string;
	array: Record<string, any>[];
	type: 'bento-grid' | 'single-row';
};

function CardCatalogLink({ title, array, type }: CardCatalogLinkProps) {
	const arrayWithSubArrays = splitIntoSubArrays(array, 3);

	return (
		<div className={styles['card-catalog-link']}>
			<div
				className={`${styles['card-catalog-link__title-container']} ${
					styles[`card-catalog-link__title-container_type_${type}`]
				}`}
			>
				<Link to="/catalog" className={styles.link}>
					<h2 className={styles['card-catalog-link__title']}>{title}</h2>
				</Link>
				<span className={styles['card-catalog-link__arrow']} />
			</div>
			{arrayWithSubArrays.map((subArray, index) => (
				<ul className={styles['card-catalog-link__list']} key={index}>
					{subArray.map((item: Record<string, any>, index: number) => (
						<li className={styles['card-catalog-link__list-item']} key={index}>
							{type === 'bento-grid' && (
								<CardBlockLink
									title={item.title}
									link={item.link}
									backgroundImage={item.backgroundImage}
								/>
							)}
							{type === 'single-row' && (
								<ProductCard
									cardName={item.cardName}
									price={item.price}
									weight={item.weight}
									buttonText={item.buttonText}
								/>
							)}
						</li>
					))}
				</ul>
			))}
		</div>
	);
}

export default CardCatalogLink;
