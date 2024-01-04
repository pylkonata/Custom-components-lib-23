import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

describe('TextField', () => {
	test('render basic TextField', () => {
		render(<TextField label='Label text' variant='outlined' />);
		const textField = screen.getByTestId('textField');
		const cover = screen.queryByTestId('cover');
		expect(cover).toBeInTheDocument();
		expect(textField).toBeInTheDocument();
		expect(textField).toMatchSnapshot();
		expect(textField).toBeEnabled();
	});

	test('render TextField without cover element', () => {
		render(<TextField label='Label text' variant='filled' />);
		const cover = screen.queryByTestId('cover');
		expect(cover).not.toBeInTheDocument();
	});

	test('check input value', () => {
		render(<TextField label='Name' variant='standard' />);
		function hasInputValue(e: Element, inputValue: string) {
			return screen.getByDisplayValue(inputValue) === e;
		}
		const input = screen.getByTestId('input');
		expect(input).toBeInTheDocument();
		expect(input).toContainHTML('');

		fireEvent.input(input, { target: { value: 'test 123' } });
		expect(screen.getByTestId('input')).toContainHTML('test 123');

		fireEvent.change(input, { target: { value: 'new value' } });
		expect(hasInputValue(input, 'new value')).toBe(true);
	});

	test('render TextField with disabled value', () => {
		render(<TextField label='disabled' variant='outlined' disabled={true} />);

		const input = screen.getByTestId('input');
		const container = screen.getByTestId('container');

		expect(input).toBeInTheDocument();
		expect(input).toBeDisabled();

		expect(container).toBeInTheDocument();
		expect(container).toHaveClass('container', 'outlined', 'disabled');
	});

	test('render TextField with error value', () => {
		render(<TextField label='error' variant='filled' error={true} errorText='Error text' />);

		const errorText = screen.getByText('Error text');
		const container = screen.getByTestId('container');

		expect(errorText).toBeInTheDocument();

		expect(container).toBeInTheDocument();
		expect(container).toHaveClass('container', 'filled', 'error');
	});
});
