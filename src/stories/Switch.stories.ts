import type { Meta, StoryObj } from '@storybook/react';

import Switch from '../Switch/Switch';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'MyComponent/Switch',
	component: Switch,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultSwitch: Story = {
	args: {
		checked: false,
	},
};

export const SwitchCheckedWithLabel: Story = {
	args: {
		checked: true,
		label: 'Some label',
		onChange: () => {},
	},
};
export const SwitchDisabled: Story = {
	args: {
		disabled: true,
		checked: true,
	},
};
