import React from 'react';
import notFoundSvg from '@images/page-404.svg';
import styles from './not-found.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	return (
		<section className={`${styles['notFound']}`}>
			<img className={`${styles['notFound__svg']}`} src={notFoundSvg} alt="notFoundSvg" />
			<div className={`${styles['notFound__container']}`}>
				<h1 className={`${styles['notFound__title']}`}>
					Упс! <span className={styles['notFound__subtitle']}>Что-то пошло не так</span>
				</h1>
				<Link to={'/'} className={`${styles['notFound__svg__button']}`}>
					Вернуться на главную
				</Link>
			</div>
		</section>
	);
};

export default NotFound;
