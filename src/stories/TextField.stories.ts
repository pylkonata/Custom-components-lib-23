import type { Meta, StoryObj } from '@storybook/react';

import TextField from '../TextField/TextField';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'MyComponent/TextField',
	component: TextField,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const OutlinedTextField: Story = {
	args: {
		variant: 'outlined',
		label: 'Some text',
	},
};

// export const TextBtn: Story = {
// 	args: {
// 		variant: 'text',
// 		size: 'small',
// 		children: 'Text small button',
// 	},
// };

// export const OutlinedDisabledBtn: Story = {
// 	args: {
// 		variant: 'outlined',
// 		size: 'large',
// 		children: 'Outlined large button',
// 		disabled: true,
// 	},
// };
