import { ChangeEvent, useId, useState, MouseEvent } from 'react';
import s from './Switch.module.scss';
interface SwitchProps {
	checked: boolean;
	onChange: () => void;
	label?: string;
	disabled?: boolean;
}

const Switch = ({ disabled, checked, onChange, label }: SwitchProps) => {
	const [isChecked, setIsChecked] = useState(checked);
	const id = useId();
	const onChangeSwitch = (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) => {
		if (event.currentTarget !== event.target) {
			return;
		}
		setIsChecked((prev) => !prev);
		onChange();
	};
	const wrapClasses = [s['wrapper'], disabled ? s['disabled'] : ''].join(' ');

	return (
		<div className={wrapClasses} data-testid='wrapper'>
			<div className={s['container']} onClick={onChangeSwitch} tabIndex={-1}>
				<input
					type='checkbox'
					id={`switch-${id}`}
					className={s['switch']}
					onChange={onChangeSwitch}
					checked={isChecked}
					disabled={disabled}
				/>
				<div className={s['circle']} />
			</div>
			<label htmlFor={`switch-${id}`} className={s['label']} data-testid='label'>
				{label}
			</label>
		</div>
	);
};

export default Switch;
