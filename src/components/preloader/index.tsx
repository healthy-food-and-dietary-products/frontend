import React from 'react';
import styles from './preloader.module.scss';

const Preloader: React.FC = () => {
	return (
		<div className={styles.preloader}>
			<span className={styles.loader}></span>
		</div>
	);
};

export default Preloader;
