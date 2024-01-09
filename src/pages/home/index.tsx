import React from 'react';
import SliderComponent from '@components/slider-component';
import styles from './home.module.scss';
import InfoCard from '@components/info-card';
import usefulProductsIcon from '@images/useful-products-icon.svg';
import roundTheClockDelivery from '@images/round-the-clock-delivery.svg';
import TopSellingThisWeek from '@components/top-selling-this-week';
import AboutCompany from '@components/about-company/index.tsx';
import OurBlock from '@components/our-block';
import CatalogPromo from '@components/catalog-promo';
import ScrollToAnchorHash from '@components/scroll-to-anchor-hash';

const Home: React.FC = () => {
	return (
		<div>
			<ScrollToAnchorHash />
			<section className={styles.home__sliderSection}>
				<SliderComponent />
			</section>
			<section id="delivery" className={styles.home__productsAndDelivery}>
				<InfoCard
					title="Только свежие и полезные продукты"
					description="Мы отбираем поставщиков и контролируем качество на каждом этапе"
					imageUrl={usefulProductsIcon}
					altText="Продукты"
				/>
				<InfoCard
					title="Круглосуточная бесплатная доставка"
					description="Порадуем вкусными продуктами и днем и ночью"
					imageUrl={roundTheClockDelivery}
					altText="Доставка"
				/>
			</section>
			<section className={styles.home__catalogSection}>
				<CatalogPromo />
			</section>
			<section id="topSelling" className={styles.home__topSellingThisWeek}>
				<TopSellingThisWeek />
			</section>
			<section id="aboutCompany" className={styles.home__aboutCompany}>
				<AboutCompany />
			</section>
			<section className={styles.home__ourBlock}>
				<OurBlock />
			</section>
		</div>
	);
};

export default Home;
