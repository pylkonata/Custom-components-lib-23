import React from 'react';
import s from './Button.module.scss';

export type VariantBtn = 'text' | 'contained' | 'outlined';
export type SizeBtn = 'small' | 'medium' | 'large';

export interface ButtonProps {
	variant?: VariantBtn;
	size: SizeBtn;
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
}
const Button = ({
	variant = 'contained',
	size,
	onClick,
	disabled = false,
	children,
	...props
}: ButtonProps) => {
	const classStyles = [s['btn'], s[variant], s[size]];
	return (
		<button className={classStyles.join(' ')} disabled={disabled} onClick={onClick} {...props}>
			{children}
		</button>
	);
};

export default Button;
