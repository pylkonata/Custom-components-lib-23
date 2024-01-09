import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
	test('not render Modal', () => {
		const closeModal = jest.fn();
		render(<Modal open={false} onClose={closeModal}>Modal</Modal>);
		const wrapper = screen.queryByTestId('wrapper');

		expect(wrapper).not.toBeInTheDocument();
	});

	test('render basic Modal', async () => {
		const user = userEvent.setup();
		const closeModal = jest.fn();
		render(<Modal open={true} onClose={closeModal}>Modal</Modal>);
		const wrapper = screen.queryByTestId('wrapper');
		const backdrop = screen.queryByTestId('backdrop');

		expect(wrapper).toBeInTheDocument();
		expect(wrapper).toHaveClass('modalWrapper', 'active');
		expect(wrapper).toContainHTML('Modal');

		await user.click(backdrop);
		expect(closeModal).toHaveBeenCalledTimes(1);
	});
});
