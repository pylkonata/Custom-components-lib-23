import type { Meta, StoryObj } from '@storybook/react';

import Button from '../Button/Button';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'MyComponent/Button',
	component: Button,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultBtn: Story = {
	args: {
		variant: 'contained',
		size: 'medium',
		children: 'Some text',
	},
};

export const TextBtn: Story = {
	args: {
		variant: 'text',
		size: 'small',
		children: 'Text small button',
	},
};

export const OutlinedDisabledBtn: Story = {
	args: {
		variant: 'outlined',
		size: 'large',
		children: 'Outlined large button',
		disabled: true,
	},
};
