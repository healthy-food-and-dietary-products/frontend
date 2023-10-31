import type { Meta, StoryObj } from '@storybook/react';
import InputContainerSearch from '.';

const meta: Meta<typeof InputContainerSearch> = {
	component: InputContainerSearch,
	title: 'InputContainerSearch',
	tags: ['autodocs'],
	argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/**  comments shows in InputContainerSearch story Docks  */
export const Default: Story = {
	args: {},
	render: (args) => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px',
			}}
		>
			<InputContainerSearch {...args} />
			<InputContainerSearch {...args} />
			<InputContainerSearch {...args} />
		</div>
	),
};
