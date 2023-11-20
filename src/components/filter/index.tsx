import DropDown from '@components/drop-down';
import styles from './filter.module.scss';

const Filter: React.FC = () => {

	return (
		<>
			<div className={styles.filterDropDown}>

			<DropDown />
			</div>
			<div className={styles.filterBox}>
				<ul className={styles.filterColumn}>
					<li className={styles.filterList}>
    				<label className={styles.filterCheck}>
							<input className={styles.filterCheckInput} type="checkbox" />
							<span className={styles.filterCheckbox}></span>
								Подходит вегетарианцам
						</label>
					</li>
					<li className={styles.filterList}>
    				<label className={styles.filterCheck}>
							<input className={styles.filterCheckInput} type="checkbox" />
							<span className={styles.filterCheckbox}></span>
								Без белого сахара
						</label>
					</li>
					<li className={styles.filterList}>
    				<label className={styles.filterCheck}>
							<input className={styles.filterCheckInput} type="checkbox" />
							<span className={styles.filterCheckbox}></span>
								Без глютена
						</label>
					</li>
					<li className={`${styles['filterList']}
							${styles['filterList_disabled']}`}>
    				<label className={styles.filterCheck}>
							<input className={styles.filterCheckInput} type="checkbox" disabled={true}/>
							<span className={styles.filterCheckbox}></span>
								Без лактозы
						</label>
					</li>
					<li className={styles.filterList}>
    				<label className={styles.filterCheck}>
							<input className={styles.filterCheckInput} type="checkbox" />
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
