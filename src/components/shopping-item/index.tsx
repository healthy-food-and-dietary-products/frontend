import React from 'react';
import styles from './shopping-item.module.scss';
import { productApiDataExample } from '@data/dataExamples';

const ShoppingItem: React.FC = () => {
	const data = productApiDataExample;
	return (
		<div className={styles.item}>
			<img className={styles.item__image} src={data.photo} alt={data.name} />
			<div className={styles.item__container}>
				<p className={`text_type_u ${styles.item__title}`}>{data.name}</p>
				<div className={styles.item__weight}>
					<button className={`${styles.item_btn} ${styles.item__decrease_btn}`}></button>
					<p className={`text_type_u ${styles.item__measure}`}>300 гр</p>
					<button className={`${styles.item_btn} ${styles.item__increase_btn}`}></button>
				</div>
			</div>
			<p className={`text_type_u ${styles.item__price}`}>{data.price} руб.</p>
			<button className={`${styles.item_btn} ${styles.item__delete_btn}`}></button>
		</div>
	);
};

export default ShoppingItem;
