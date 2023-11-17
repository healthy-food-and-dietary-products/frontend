import React from 'react';
import styles from './shopping-list.module.scss';
import ShoppingItem from '@components/shopping-item';

const ShoppingList: React.FC = () => {
	return (
		<div className={styles.products}>
			<ShoppingItem />
			<ShoppingItem />
			<ShoppingItem />
			<ShoppingItem />
		</div>
	);
};

export default ShoppingList;
