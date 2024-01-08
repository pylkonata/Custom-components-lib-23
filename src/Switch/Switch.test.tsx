import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from './Switch';

describe('Switch', () => {
	test('render basic Switch', async () => {
		const user = userEvent.setup();
		const handleOnChange = jest.fn();
		render(<Switch checked={false} onChange={handleOnChange} />);
		const switcher = screen.getByRole('checkbox');

		expect(switcher).toBeInTheDocument();
		expect(switcher).toBeEnabled();
		expect(switcher).toMatchSnapshot();

		expect(switcher).not.toBeChecked();
		await user.click(switcher);
		expect(switcher).toBeChecked();
		expect(handleOnChange).toHaveBeenCalledTimes(1);
	});

	test('render Switch with label', () => {
		const handleOnChange = jest.fn();
		render(<Switch checked={false} onChange={handleOnChange} label='Label' />);
		const label = screen.queryByTestId('label');

		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent('Label');
	});

	test('render disabled Switch', async () => {
		const user = userEvent.setup();
		const handleOnChange = jest.fn();
		render(<Switch checked={false} onChange={handleOnChange} disabled={true} />);
		const switcher = screen.getByRole('checkbox');
		const wrapper = screen.queryByTestId('wrapper');

		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('wrapper', 'disabled');

		await user.click(switcher);
		expect(handleOnChange).not.toHaveBeenCalled();
	});
});
