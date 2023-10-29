import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import TopicCard from '.';

const meta: Meta<typeof TopicCard> = {
	component: TopicCard,
	title: 'TopicCard',
	tags: ['autodocs'],
	argTypes: {
		cardDate: {
			control: { type: 'text' },
			// control: { type: 'radio' },
			// options: [1, 2, 3],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

/**  comments shows in TopicCard story Docks  */
export const Default: Story = {
	args: {
		cardName: 'Оладьи без яиц',
		cardDescription: 'Итальянская классика за 30 минут на вашем столе.',
		cardDate: '29 окт. 2023',
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
				<TopicCard {...args} />
				<TopicCard {...args} />
				<TopicCard {...args} />
			</div>
		</BrowserRouter>
	),
};
