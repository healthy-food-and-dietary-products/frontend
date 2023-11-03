import React from 'react';
import SliderComponent from '../../components/slider-component';
import styles from './home.module.scss';
import InfoCard from '@components/info-card';
import usefulProductsIcon from '@images/useful-products-icon.svg';
import roundTheClockDelivery from '@images/round-the-clock-delivery.svg';
import CardCatalogLink from '@components/card-catalog-link';
import { mainPageBlockLinks } from '../../data/dataExamples.ts';
import TopSellingThisWeek from '@components/top-selling-this-week';
import AboutCompany from '@components/about-company/index.tsx';
import OurBlock from '@components/our-block/our-block.tsx';

const Home: React.FC = () => {
	// const api = new Api(BACKEND_URL);
	// api.getFavoriteProducts();
	// api.getFavoriteProduct(777);
	// api.getProducers();
	// api.getProducer(333);
	// api.postProducers({
	// 	name: 'string',
	// 	slug: 'string',
	// 	producer_type: 'string',
	// 	description: 'string',
	// 	address: 'string',
	// });
	// api.patchProducer(333, {
	// 	name: 'string',
	// 	slug: 'string',
	// 	producer_type: 'string',
	// 	description: 'string',
	// 	address: 'string',
	// });
	// api.deleteProducer(111);
	// api.getProducts()

	// const ggg: ProductType = {
	// 	name: 'test-test',
	// 	subcategory: 1,
	// 	tags: [1],
	// 	producer: 1,
	// 	price: 1,
	// 	components: [1],
	// 	kcal: 1,
	// 	proteins: 1,
	// 	fats: 1,
	// 	carbohydrates: 1,
	// 	description: 'string',
	// 	discontinued: true,
	// 	measure_unit: 'grams',
	// 	amount: 1,
	// 	views_number: 1,
	// };

	// api.postProducts(ggg);

	// api.getProduct(10)
	// api.patchProduct(1, {
	// 	name: 'авокадо',
	// 	subcategory: 8,
	// 	producer: 1,
	// 	price: 50.0,
	// 	components: [1],
	// 	kcal: 100,
	// 	proteins: 10,
	// 	fats: 10,
	// 	carbohydrates: 5,
	// 	measure_unit: 'grams',
	// });
	// api.deleteProduct(13)

	// api.postFavoriteProduct(7, {
	// name: 'авокадо',
	// 	subcategory: 8,
	// 	producer: 1,
	// 	price: 50.0,
	// 	components: [1],
	// 	kcal: 100,
	// 	proteins: 10,
	// 	fats: 10,
	// 	carbohydrates: 5,
	// 	measure_unit: 'grams',
	// })
	// api.postFavoriteProduct(21)

	// api.deleteFavoriteProduct(7)

	return (
		<div>
			<section className={styles.home__sliderSection}>
				<SliderComponent />
			</section>
			<section className={styles.home__productsAndDelivery}>
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
				<CardCatalogLink title="Каталог" type="bento-grid" array={mainPageBlockLinks} />
			</section>
			<section className={styles.home__topSellingThisWeek}>
				<TopSellingThisWeek />
			</section>
			<section className={styles.home__aboutCompany}>
				<AboutCompany />
			</section>
			<section className={styles.home__ourBlock}>
				<OurBlock />
			</section>
		</div>
	);
};

export default Home;
