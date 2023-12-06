import styles from './about-company.module.scss';

const AboutCompany = () => {
	return (
		<div className={styles.aboutCompany}>
			<div className={styles.aboutCompany__intro}>
				<h2 className={styles.aboutCompany__title}>Переходи с нами на сторону добра!</h2>
				<div className={styles.aboutCompany__textBlock}>
					<p
						className={`${styles['aboutCompany__paragraphBold']}
							${styles['aboutCompany__paragraphPadding']}`}
					>
						Вся продукция проверяется нашими экспертами на соответствие качества. Вы
						можете быть уверены в свежей, вкусной диетической и здоровой продукции.
					</p>
					<p className={styles.aboutCompany__paragraph}>
						Мы предоставляем широкий выбор ассортимента и вы обязательно найдёте у нас
						свои любимые продукты.
					</p>
					<p className={styles.aboutCompany__paragraph}>
						А если не нашли, то пишите нам.
					</p>
				</div>
			</div>
			<div className={styles.aboutCompany__container}>
				<div className={styles.aboutCompany__forTwoBlocks}>
					<div
						className={`${styles['aboutCompany__block']}
								${styles['aboutCompany__greyBlock']}`}
					>
						<h3 className={styles.aboutCompany__title}>100%</h3>
						<p className={styles.aboutCompany__paragraphBold}>Качество</p>
						<p className={styles.aboutCompany__paragraph}>
							Гарантируем возврат, если качество вас не устроит.
						</p>
					</div>
					<div
						className={`${styles['aboutCompany__block']}
								${styles['aboutCompany__imgBlock']}`}
					></div>
				</div>
				<div
					className={`${styles['aboutCompany__block']}
								${styles['aboutCompany__greenBlock']}`}
				>
					<h3
						className={`${styles['aboutCompany__title']}
							${styles['aboutCompany__text_white']}`}
					>
						до 300 кг
					</h3>
					<div className={styles.aboutCompany__blockBigMargin}>
						<p
							className={`${styles['aboutCompany__paragraphBold']}
								${styles['aboutCompany__text_white']}`}
						>
							Столько продуктов ежедневно доставляют наши курьеры
						</p>
						<p
							className={`${styles['aboutCompany__paragraph']}
								${styles['aboutCompany__text_white']}`}
						>
							Курьер донесет тяжелые пакеты до двери вне зависимости, есть ли у вас лифт и
							на каком этаже вы живете.
						</p>
					</div>
				</div>
				<div
					className={`${styles['aboutCompany__block']}
								${styles['aboutCompany__lightGreenBlock']}`}
				>
					<h3 className={styles.aboutCompany__title}>не менее 50%</h3>
					<div className={styles.aboutCompany__blockSmallMargin}>
						<p className={styles.aboutCompany__paragraphBold}>
							Составляет срок годности доставляемых продуктов
						</p>
						<p className={styles.aboutCompany__paragraph}>
							Только свежие и качественные продукты, заботливо упакованные нашими
							сборщиками передаются в доставку для вас.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutCompany;
