import type { Meta, StoryObj } from '@storybook/react';
import InputContainerWide from '.';

const meta: Meta<typeof InputContainerWide> = {
	component: InputContainerWide,
	title: 'InputContainerWide',
	tags: ['autodocs'],
	argTypes: {
		inputName: {
			control: { type: 'text' },
			// control: { type: 'radio' },
			// options: [1, 2, 3],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

/**  comments shows in InputContainerWide story Docks  */
export const Default: Story = {
	args: {
		inputName: 'Email',
	},
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
			<InputContainerWide {...args} />
			<InputContainerWide {...args} />
			<InputContainerWide {...args} />
		</div>
	),
};
