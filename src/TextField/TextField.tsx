import React, { useId } from 'react';
import s from './TextField.module.scss';

type VariantTextField = 'outlined' | 'filled' | 'standard';
interface ITextFieldProps {
	label: string;
	variant: VariantTextField;
	error?: boolean;
	disabled?: boolean;
}
const TextField = ({ label, variant, error, disabled = false, ...props }: ITextFieldProps) => {
	const id = useId();

	return (
		<div className={s[variant]}>
			<label className={s.label} htmlFor={id}>
				{label}
			</label>
			<input id={id} className={s.input} type='text' disabled={disabled} {...props} />
			{error && <p>Some error</p>}
		</div>
	);
};

export default TextField;
