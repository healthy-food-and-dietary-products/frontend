import { BrowserRouter } from 'react-router-dom';
import ProductCard from '.';

export default {
	title: 'ProductCard',
	component: ProductCard,
};

const Template = (args) => (
	<BrowserRouter>
		<ProductCard {...args} />
	</BrowserRouter>
);

export const Default = Template.bind({});
Default.args = {
	cardName: 'Манго Египет',
	price: '80 руб.',
	weight: '1кг',
	buttonText: 'В корзину',
};
