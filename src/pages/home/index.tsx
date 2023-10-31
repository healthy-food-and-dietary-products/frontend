import React from 'react';
import SliderComponent from '../../components/slider-component';

import styles from './home.module.scss';

const Home: React.FC = () => {
	return (
		<div>
			<section className={styles.home__sliderSection}>
				<SliderComponent />
			</section>
		</div>
	);
};

export default Home;
