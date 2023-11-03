import type { Meta, StoryObj } from '@storybook/react';
import ScrollToTopButton from './index';

const meta: Meta<typeof ScrollToTopButton> = {
	component: ScrollToTopButton,
	title: 'ScrollToTopButton',
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => <ScrollToTopButton />,
};
