import styles from './scroll-to-top-button.module.scss';
import { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	function toggleVisibility() {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<button
			className={`${styles['scroll-to-top-button']} ${
				isVisible ? styles['scroll-to-top-button_visible'] : ''
			}`}
			onClick={scrollToTop}
		/>
	);
};

export default ScrollToTopButton;
