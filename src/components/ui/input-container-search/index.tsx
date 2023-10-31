import { ReactNode } from 'react';
import styles from './input-container-search.module.scss';

type InputContainerSearchProps = {
	children: ReactNode;
};

const InputContainerSearch = ({ children }: InputContainerSearchProps) => {
	return (
		<div className={styles.container}>
			<button className={styles.container__button} />
			{children}
			<input className={styles.container__input} type="text" />
		</div>
	);
};

export default InputContainerSearch;
