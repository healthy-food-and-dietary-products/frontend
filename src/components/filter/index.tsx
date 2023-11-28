import React, { ChangeEvent } from 'react';
import DropDown from '@components/drop-down';
import styles from './filter.module.scss';

type FilterProps = {
	sortProducts: (option: { label: string; value: string }) => void;
	changeCheckboxState: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Filter: React.FC<FilterProps> = ({ sortProducts, changeCheckboxState }) => {
	const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
		changeCheckboxState(e);
	};

	return (
		<>
			<div className={styles.filterDropDown}>
				<DropDown sortProducts={sortProducts} />
			</div>
			<div className={styles.filterBox}>
				<ul className={styles.filterColumn}>
					<li className={styles.filterList}>
						<label className={styles.filterCheck}>
							<input
								name="vegetarian"
								className={styles.filterCheckInput}
								type="checkbox"
								onChange={handleCheckboxChange}
							/>
							<span className={styles.filterCheckbox}></span>
							Подходит вегетарианцам
						</label>
					</li>
					<li className={styles.filterList}>
						<label className={styles.filterCheck}>
							<input
								name="sugarless"
								className={styles.filterCheckInput}
								type="checkbox"
								onChange={handleCheckboxChange}
							/>
							<span className={styles.filterCheckbox}></span>
							Без белого сахара
						</label>
					</li>
					<li className={styles.filterList}>
						<label className={styles.filterCheck}>
							<input
								name="gluten-free"
								className={styles.filterCheckInput}
								type="checkbox"
								onChange={handleCheckboxChange}
							/>
							<span className={styles.filterCheckbox}></span>
							Без глютена
						</label>
					</li>
					<li className={styles.filterList}>
						<label className={styles.filterCheck}>
							<input
								name="lactose-free"
								className={styles.filterCheckInput}
								type="checkbox"
								onChange={handleCheckboxChange}
							/>
							<span className={styles.filterCheckbox}></span>
							Без лактозы
						</label>
					</li>
					<li className={styles.filterList}>
						<label className={styles.filterCheck}>
							<input
								name="kids"
								className={styles.filterCheckInput}
								type="checkbox"
								onChange={handleCheckboxChange}
							/>
							<span className={styles.filterCheckbox}></span>
							Для детей
						</label>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Filter;
