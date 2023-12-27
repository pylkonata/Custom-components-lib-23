import { ChangeEvent, useEffect, useId, useRef, useState } from 'react';
import s from './TextField.module.scss';

type VariantTextField = 'outlined' | 'filled' | 'standard';
interface ITextFieldProps {
	label: string;
	variant: VariantTextField;
	error?: boolean;
	errorText?: string;
	disabled?: boolean;
}

const TextField = ({
	label,
	variant,
	error,
	errorText,
	disabled = false,
	...props
}: ITextFieldProps) => {
	const id = useId();
	const [focusState, setFocusState] = useState(false);
	const [value, setValue] = useState('');
	const [labelWidth, setLabelWidth] = useState(0);
	const labelRef = useRef<HTMLLabelElement>(null);

	useEffect(() => {
		setLabelWidth(labelRef.current ? labelRef.current.getBoundingClientRect().width : 0);
	}, [labelRef]);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const containerClasses = [
		s['container'],
		s[variant],
		error ? s['error'] : '',
		disabled ? s['disabled'] : '',
	].join(' ');

	const labelClasses = [
		s['label'],
		focusState ? s['focused'] : '',
		error ? s['errorLabel'] : '',
	].join(' ');

	return (
		<div className={s['wrapper']} data-testid='textField'>
			<div className={containerClasses} data-testid='container'>
				<label className={labelClasses} htmlFor={id} ref={labelRef}>
					{error ? 'Error' : label}
				</label>
				<input
					data-testid='input'
					id={id}
					className={s.input}
					type='text'
					disabled={disabled}
					value={value}
					onFocus={() => {
						setFocusState(true);
					}}
					onBlur={() => {
						setFocusState(Boolean(value));
					}}
					onChange={onChangeInput}
					{...props}
				/>
				{variant === 'outlined' && (
					<p
						className={`${focusState ? `${s['coverFocused']} ` : ''} ${s['cover']}`}
						style={{ width: labelWidth }}
						data-testid='cover'
					/>
				)}
			</div>
			{errorText && <p className={s['errorText']}>{errorText}</p>}
		</div>
	);
};

export default TextField;
