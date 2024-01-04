import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
	test('render default button', () => {
		render(<Button size='medium' children='Default button' />);

		const btn = screen.getByRole('button');
		expect(btn).toBeInTheDocument();
		expect(btn).toMatchSnapshot();
		expect(btn).toBeEnabled();
		expect(btn).toHaveClass('btn', 'contained', 'medium');
	});

	test('render disabled button with not call onClick', () => {
		const handleClick = jest.fn();
		render(
			<Button
				variant='outlined'
				size='large'
				disabled={true}
				children='Disabled button'
				onClick={handleClick}
			/>
		);

		const btn = screen.getByRole('button');
		expect(btn).toBeInTheDocument();
		expect(btn).toMatchSnapshot();
		expect(btn).toBeDisabled();
		expect(btn).toHaveClass('btn', 'large', 'outlined');
		fireEvent.click(btn);
		expect(handleClick).not.toHaveBeenCalled();
	});

	test('render button with onClick function', () => {
		const handleClick = jest.fn();
		render(<Button variant='text' size='small' onClick={handleClick} children='Click button' />);

		const btn = screen.getByText(/click button/i);
		expect(btn).toBeInTheDocument();
		expect(btn).toHaveClass('btn', 'text', 'small');
		fireEvent.click(btn);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
