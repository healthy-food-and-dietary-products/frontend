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
					cardDate="30 минут"
				/>
				<TopicCard
					cardName="Вегетарианский суп"
					cardDescription="Согревающий суп, как раз для начала осени."
					cardDate="40 минут"
				/>
				<TopicCard
					cardName="Паста болоньезе"
					cardDescription="Итальянская класстка за 30 минут на вашем столе."
					cardDate="60 минут"
				/>
			</div>
		</div>
	);
};

export default OurBlock;
