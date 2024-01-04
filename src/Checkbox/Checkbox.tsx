import { CSSProperties, useId, useState } from 'react';
import s from './Checkbox.module.scss';

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

	const containerClasses = [s['container'], disabled ? s['disabled'] : ''].join(' ');
	const onChangeCheckbox = () => {
		setIsChecked((prev) => !prev);
		if (onChange) {
			onChange();
		}
	};
	const handleOnHover = () => {
		if (color) {
			setOnHover((prev) => !prev);
		}
	};
	const checkboxStyle = {
		backgroundColor: onHover && color ? color : '',
	};
	console.log(onHover);
	console.log(color);
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
			{label && <label htmlFor={`input-${id}`}>{label}</label>}
		</div>
	);
};

export default Checkbox;
