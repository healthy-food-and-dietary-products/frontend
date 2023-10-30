import type { Meta, StoryObj } from '@storybook/react';
import InputContainer from '.';

const meta: Meta<typeof InputContainer> = {
	component: InputContainer,
	title: 'InputContainer',
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

/**  comments shows in InputContainer story Docks  */
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
			<InputContainer {...args} />
			<InputContainer {...args} />
			<InputContainer {...args} />
		</div>
	),
};
