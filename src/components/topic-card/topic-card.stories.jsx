import { BrowserRouter } from 'react-router-dom';
import TopicCard from '.';

export default {
	title: 'TopicCard',
	component: TopicCard,
};

const Template = (args) => (
	<BrowserRouter>
		<TopicCard {...args} />
	</BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
	cardName: 'Оладьи без яиц',
	cardDescription: 'Итальянская классика за 30 минут на вашем столе.',
	cardDate: '29 окт. 2023',
};
