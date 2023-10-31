import React from 'react';
import styles from '../slider-item-three/slider-item-three.module.scss';
import vegetablesSlider from '@images/vegetables_slider_03.png';

const SliderItemTwo: React.FC = () => {
	return (
		<div className={styles.slider__ItemContent}>
			<div className={styles.slider__content}>
				<h1 className={styles.slider__title}>
					<span className={styles.firstLine}>Бесплатная</span>
					<span className={styles.secondLine}>доставка</span>
				</h1>
			</div>
			<img className={styles.slider__image} src={vegetablesSlider} alt="Описание" />
		</div>
	);
};

export default SliderItemTwo;
