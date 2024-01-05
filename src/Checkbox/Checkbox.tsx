import { CSSProperties, ChangeEvent, useEffect, useId, useRef, useState, MouseEvent } from 'react';
import s from './Checkbox.module.scss';

import { transformToHexa } from './transformToHexa';

export interface CheckboxProps {
	checked?: boolean;
	label?: string;
	color?: CSSProperties['color'];
	disabled?: boolean;
	onChange?: () => void;
}

const Checkbox = ({ checked = false, label, color, disabled = false, onChange }: CheckboxProps) => {
	const id = useId();
	const [isChecked, setIsChecked] = useState(checked);
	const [onHover, setOnHover] = useState(false);
	const colorBackRef = useRef('');

	useEffect(() => {
		if (color) {
			colorBackRef.current = transformToHexa(color, 0.04);
		}
	}, [color]);

	const containerClasses = [s['container'], disabled ? s['disabled'] : ''].join(' ');

	const labelClasses = [s['label'], disabled ? s['disabled'] : ''].join(' ');

	const checkboxStyle = {
		backgroundColor: onHover && color ? colorBackRef.current : '',
	};

	const onChangeCheckbox = (
		event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement, globalThis.MouseEvent>
	) => {
		if (event.currentTarget !== event.target) {
			return;
		}

		setIsChecked((prev) => !prev);
		if (onChange) {
			onChange();
		}
	};
	const handleOnHover = () => {
		if (color && !disabled) {
			setOnHover((prev) => !prev);
		}
	};

	return (
		<div className={containerClasses} data-testid='container'>
			<div
				className={s['checkbox']}
				onMouseEnter={handleOnHover}
				onMouseLeave={handleOnHover}
				style={checkboxStyle}
				onClick={onChangeCheckbox}
				data-testid='checkboxWrap'
			>
				<input
					type='checkbox'
					id={`input-${id}`}
					style={{ accentColor: color ? color : '' }}
					onChange={onChangeCheckbox}
					checked={isChecked}
					disabled={disabled}
					className={s['input']}
				/>
			</div>
			{label && (
				<label htmlFor={`input-${id}`} className={labelClasses} data-testid='label'>
					{label}
				</label>
			)}
		</div>
	);
};

export default Checkbox;
