import React, { ReactNode } from 'react';
import { useSwiper } from 'swiper/react';
import styles from './slider-button.module.scss';

type ButtonProps = {
	children?: ReactNode;
	classNameButton?: string;
	direction: 'next' | 'prev';
};

const SlideButton: React.FC<ButtonProps> = ({ children, classNameButton, direction }) => {
	const swiper = useSwiper();

	return (
		<button
			className={`${styles.button} ${classNameButton}`}
			onClick={() => (direction === 'next' ? swiper.slideNext() : swiper.slidePrev())}
		>
			{children}
		</button>
	);
};

export default SlideButton;
