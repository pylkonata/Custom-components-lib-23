import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
	test('render basic Checkbox', () => {
		render(<Checkbox />);
		const checkbox = screen.getByRole('checkbox');
		const label = screen.queryByTestId('label');

		expect(checkbox).toBeInTheDocument();
		expect(label).not.toBeInTheDocument();
		expect(checkbox).toBeEnabled();
		expect(checkbox).toMatchSnapshot();
	});

	test('render Checkbox with label and color', () => {
		render(<Checkbox label='Label text' color='#2e7d32' />);
		const checkbox = screen.getByRole('checkbox');
		const checkboxWrap = screen.getByTestId('checkboxWrap');
		const label = screen.getByTestId('label');

		expect(checkbox).toBeInTheDocument();
		expect(label).toBeInTheDocument();
		expect(label).toHaveTextContent('Label text');
		fireEvent.mouseEnter(checkboxWrap);
		expect(screen.getByTestId('checkboxWrap')).toHaveStyle({
			backgroundColor: '#2e7d320a',
		});
	});

	test('render checked and disabled Checkbox', async () => {
		const user = userEvent.setup();
		const handleOnChange = jest.fn();
		render(<Checkbox checked={true} disabled={true} onChange={handleOnChange} />);

		const checkbox = screen.getByRole('checkbox');
		const container = screen.getByTestId('container');

		expect(checkbox).toBeDisabled();
		expect(checkbox).toBeChecked();

		expect(container).toHaveClass('container', 'disabled');
		await user.click(checkbox);
		expect(handleOnChange).not.toHaveBeenCalled();
	});

	test('render Checkbox with onChange props', async () => {
		const user = userEvent.setup();
		const handleOnChange = jest.fn();
		render(<Checkbox checked={false} onChange={handleOnChange} />);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).not.toBeChecked();
		await user.click(checkbox);
		expect(screen.getByRole('checkbox')).toBeChecked();
		expect(handleOnChange).toHaveBeenCalledTimes(1);
	});
});
