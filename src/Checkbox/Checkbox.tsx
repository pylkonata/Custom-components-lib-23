import { CSSProperties, useEffect, useId, useRef, useState } from 'react';
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

	const onChangeCheckbox = () => {
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
		<div className={containerClasses}>
			<div
				className={s['checkbox']}
				onMouseEnter={handleOnHover}
				onMouseLeave={handleOnHover}
				style={checkboxStyle}
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
				<label htmlFor={`input-${id}`} className={labelClasses}>
					{label}
				</label>
			)}
		</div>
	);
};

export default Checkbox;
