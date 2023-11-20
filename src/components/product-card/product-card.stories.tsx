import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '.';

const meta: Meta<typeof ProductCard> = {
	component: ProductCard,
	title: 'ProductCard',
	tags: ['autodocs'],
	argTypes: {
		cardName: {
			control: { type: 'text' },
			// control: { type: 'radio' },
			// options: [1, 2, 3],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

/**  comments shows in ProductCard story Docks  */
export const Default: Story = {
	args: {
		cardName: 'Манго Египет',
		price: 80,
		weight: 100,
	},
	render: (args) => (
		<BrowserRouter>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<ProductCard {...args} />
				<ProductCard {...args} />
				<ProductCard {...args} />
			</div>
		</BrowserRouter>
	),
};
