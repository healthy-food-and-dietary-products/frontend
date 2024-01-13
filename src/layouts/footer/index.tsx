import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { URLS } from '@data/constants.ts';

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__container}>
				<div className={styles.footer__leftBlock}>
					<h2 className={styles.footer__title}>GoodFood</h2>
					<p className={styles.footer__text}>
						Cервис по доставке здоровой и диетической еды
					</p>
					<p className={`${styles['footer__text']} ${styles['footer__text_desktop']}`}>
						&copy; 2023. «GOOD FOOD»
					</p>
				</div>
				<div className={styles.footer__centerBlock}>
					<ul className={styles.footer__text}>
						<Link to={URLS.ABOUT_US} className={styles.footer__link}>
							<li className={styles.footer__list}>О нас</li>
						</Link>
						<Link to={URLS.DELIVERY_COND} className={styles.footer__link}>
							<li className={styles.footer__list}>Условия доставки</li>
						</Link>
						<Link to={URLS.PAYMENT} className={styles.footer__link}>
							<li className={styles.footer__list}>Оплата</li>
						</Link>
						<Link to={'/contacts'} className={styles.footer__link}>
							<li className={styles.footer__list}>Контакты</li>
						</Link>
						<Link to={URLS.SUPPORT} className={styles.footer__link}>
							<li className={styles.footer__list}>Служба поддержки</li>
						</Link>
						<Link to={URLS.AGREEMENT} className={styles.footer__link}>
							<li>Политика обработки и хранения персональных данных</li>
						</Link>
					</ul>
				</div>
				<div className={styles.footer__rightBlock}>
					<p className={`${styles['footer__text']} ${styles['footer__text_middle']}`}>
						8-800-000-444-333
					</p>
					<p className={styles.footer__text}>Круглосуточно ответим на ваши вопросы</p>
				</div>
			</div>
			<p className={`${styles['footer__text']} ${styles['footer__text_mobile']}`}>
				&copy; 2023. «GOOD FOOD»
			</p>
		</footer>
	);
};

export default Footer;
