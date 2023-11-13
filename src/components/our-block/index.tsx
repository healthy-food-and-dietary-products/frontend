import React from 'react';
import TopicCard from '@components/topic-card';
import styles from './our-block.module.scss';

const OurBlock: React.FC = () => {
	return (
		<div className={styles['our-blog']}>
			<h2 className={styles['our-blog__title']}>Наш блог</h2>
			<div className={styles['our-blog__topic-list']}>
				<TopicCard
					cardName="Оладьи без яиц"
					cardDescription="Простой рецепт для уютного завтрака с семьёй."
					cardDate="29 окт. 2023"
				/>
				<TopicCard
					cardName="Оладьи без яиц"
					cardDescription="Простой рецепт для уютного завтрака с семьёй."
					cardDate="29 окт. 2023"
				/>
				<TopicCard
					cardName="Оладьи без яиц"
					cardDescription="Простой рецепт для уютного завтрака с семьёй."
					cardDate="29 окт. 2023"
				/>
			</div>
		</div>
	);
};

export default OurBlock;
