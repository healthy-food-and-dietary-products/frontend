import React, { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import SlideNextButton from '../slider-button';
import styles from './slider-component.module.scss';
import { SliderItemOne, SliderItemTwo, SliderItemThree } from '../slider-items';
import iconButtonNext from '@images/icon-next-slide.svg';
import iconButtonPrev from '@images/icon-prev-slide.svg';

type SwiperRef = {
	activeIndex: number;
	slides: {
		length: number;
	};
};

const SliderComponent: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [totalSlides, setTotalSlides] = useState<number>(0);
	const swiperRef = useRef<SwiperRef>(null);

	useEffect(() => {
		if (swiperRef.current) {
			setCurrentSlide(swiperRef.current.activeIndex);
		}
	}, []);

	const handleSlideChange = (swiper: SwiperRef) => {
		setCurrentSlide(swiper.activeIndex);
	};

	const onSwiper = (swiper: SwiperRef) => {
		setTotalSlides(swiper.slides.length);
	};

	return (
		<section className={styles.sliders}>
			<Swiper
				modules={[Navigation, Pagination, A11y]}
				spaceBetween={50}
				slidesPerView={1}
				className={styles.slider}
				onSlideChange={(swiper) => handleSlideChange(swiper)}
				onSwiper={onSwiper}
			>
				<SwiperSlide className={styles.slider__itemSlide}>
					<SliderItemOne />
				</SwiperSlide>
				<SwiperSlide className={styles.slider__itemSlide}>
					<SliderItemTwo />
				</SwiperSlide>
				<SwiperSlide className={styles.slider__itemSlide}>
					<SliderItemThree />
				</SwiperSlide>
				{currentSlide < totalSlides - 1 && (
					<SlideNextButton
						classNameButton={`${styles.sliders__button} ${styles.next}`}
						direction={'next'}
					>
						<img src={iconButtonNext} alt="Next" />
					</SlideNextButton>
				)}
				{currentSlide > 0 && (
					<SlideNextButton
						classNameButton={`${styles.sliders__button} ${styles.prev}`}
						direction={'prev'}
					>
						<img src={iconButtonPrev} alt="Prev" />
					</SlideNextButton>
				)}
			</Swiper>
		</section>
	);
};

export default SliderComponent;
