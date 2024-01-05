import { fireEvent, render, screen } from '@testing-library/react';
import Select from './Select';

describe('Select', () => {
	const options = [
		{ value: 'option1', text: 'Option 1' },
		{ value: 'option2', text: 'Option 2' },
		{ value: 'option3', text: 'Option 3' },
		{ value: 'option4', text: 'Option 4' },
	];

	test('render basic Select', () => {
		render(<Select label='Name' options={options} />);
		const select = screen.getByTestId('containerSelect');
		const label = screen.getByTestId('label');

		expect(select).toBeInTheDocument();
		expect(label).toBeInTheDocument();
	});

	test('render Select with selected option', () => {
		render(<Select label='Age' options={options} selected={options[0]} />);
		const select = screen.getByTestId('containerSelect');
		const selectedText = screen.getByTestId('selectedText');
		const list = screen.queryByTestId('list');
		const label = screen.getByTestId('label');

		expect(select).toBeInTheDocument();
		expect(list).not.toBeInTheDocument();
		expect(selectedText).toContainHTML(options[0].text);
		expect(label).toHaveClass('label', 'active');
	});

	test('render Select with list options', () => {
		render(<Select label='Age' options={options} />);
		const select = screen.getByTestId('containerSelect');

		fireEvent.click(select);
		expect(screen.getByTestId('list')).toBeInTheDocument();

		fireEvent.click(screen.getByTestId(options[2].value));
		expect(screen.getByTestId('selectedText')).toContainHTML(options[2].text);
	});

	test('render disabled Select', () => {
		render(<Select label='Age' options={options} disabled={true} />);
		const select = screen.getByTestId('containerSelect');

		expect(select).toHaveClass('container', 'outlined', 'disabled');
	});
});
