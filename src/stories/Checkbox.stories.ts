import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../Checkbox/Checkbox';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'MyComponent/Checkbox',
	component: Checkbox,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultCheckbox: Story = {
	args: {
		checked: false,
	},
};

export const CheckboxWithColorChecked: Story = {
	args: {
		checked: true,
		color: '#d26c19',
	},
};
export const CheckboxDisabled: Story = {
	args: {
		disabled: true,
	},
};
