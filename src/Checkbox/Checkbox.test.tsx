import { render, screen, fireEvent } from '@testing-library/react';
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

	test('render checked and disabled Checkbox', () => {
		const handleOnChange = jest.fn();
		render(<Checkbox checked={true} disabled={true} onChange={handleOnChange} />);

		const checkbox = screen.getByRole('checkbox');
		const container = screen.getByTestId('container');

		expect(checkbox).toBeDisabled();
		expect(checkbox).toBeChecked();

		expect(container).toHaveClass('container', 'disabled');

		fireEvent.change(checkbox);
		expect(handleOnChange).not.toHaveBeenCalled();
	});

	test('render Checkbox with onChange props', () => {
		const handleOnChange = jest.fn();
		render(<Checkbox onChange={handleOnChange} />);

		const checkbox = screen.getByRole('checkbox');

		expect(checkbox).not.toBeChecked();
		fireEvent.click(checkbox);
		expect(checkbox).toBeChecked();
		expect(handleOnChange).toHaveBeenCalledTimes(1);
	});
});
