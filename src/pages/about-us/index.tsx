import AboutCompany from '@components/about-company';
import styles from './about-us.module.scss';
import Breadcrumbs from '@components/breadcrumbs';
import usefulProductsIcon from '@images/useful-products-icon.svg';
import roundTheClockDelivery from '@images/round-the-clock-delivery.svg';
import freshLeaf from '@images/leaf-icon.svg';
import freshBowl from '@images/bowl-icon.svg';

const AboutUs: React.FC = () => {
	return (
		<>
			<div className={styles['breadcrumbs-container']}>
				<Breadcrumbs />
			</div>
			<section className={styles.aboutUs}>
				<h1 className={styles.aboutUs_title}>
					Good Food - доставка полезных и качественных продуктов
				</h1>
				<h3 className={styles.aboutUs_subtitle}>
					Наша цель это качественные продукты и здоровое питание для всех
				</h3>
				<div className={styles.aboutUs_box}>
					<div className={styles.aboutUs_twoItems}>
						<div className={styles.aboutUs_item}>
							<img
								src={freshLeaf}
								alt="Свежий лист"
								className={styles.aboutUs_itemImg}
							></img>
							<h4 className={styles.aboutUs_itemTitle}>Натуральные продукты</h4>
							<p className={styles.aboutUs_itemText}>У нас только натуральные продукты</p>
						</div>
						<div className={styles.aboutUs_item}>
							<img
								src={usefulProductsIcon}
								alt="Коробка с продуктами"
								className={styles.aboutUs_itemImg}
							></img>
							<h4 className={styles.aboutUs_itemTitle}>Свежие продукты</h4>
							<p className={styles.aboutUs_itemText}>
								У нас вы найдете только свежие продукты
							</p>
						</div>
					</div>
					<div className={styles.aboutUs_oneItem}></div>
					<div className={styles.aboutUs_twoItems}>
						<div className={styles.aboutUs_item}>
							<img
								src={freshBowl}
								alt="Миска с салатом"
								className={styles.aboutUs_itemImgBowl}
							></img>
							<h4 className={styles.aboutUs_itemTitle}>Разнообразие рецептов</h4>
							<p className={styles.aboutUs_itemText}>
								Огромное количество разнообразных рецептов
							</p>
						</div>
						<div className={styles.aboutUs_item}>
							<img
								src={roundTheClockDelivery}
								alt="Фургон доставка"
								className={styles.aboutUs_itemImg}
							></img>
							<h4 className={styles.aboutUs_itemTitle}>Бесплатная доставка</h4>
							<p className={styles.aboutUs_itemText}>Вы платите только за продукты</p>
						</div>
					</div>
				</div>
			</section>
			<section id="aboutCompany" className={styles.home__aboutCompany}>
				<AboutCompany />
			</section>
		</>
	);
};

export default AboutUs;
