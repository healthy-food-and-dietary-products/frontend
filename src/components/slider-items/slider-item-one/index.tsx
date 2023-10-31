import React from 'react';
import styles from './slider-item-one.module.scss';
import vegetablesSlider from '@images/vegetables_slider_01.png';

const SliderItemOne: React.FC = () => {
	return (
		<div className={styles.slider__ItemContent}>
			<div className={styles.slider__content}>
				<h1 className={styles.slider__title}>
					<span className={styles.firstLine}>ЕШЬ ПОЛЕЗНО</span>
					<span className={styles.secondLine}>ЖИВИ ЗДОРОВО</span>
				</h1>
			</div>
			<img className={styles.slider__image} src={vegetablesSlider} alt="Описание" />
		</div>
	);
};

export default SliderItemOne;
