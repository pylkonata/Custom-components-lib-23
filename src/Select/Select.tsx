import { useEffect, useRef, useState, MouseEvent } from 'react';
import s from './Select.module.scss';
export type OptionType = {
	value: string | number;
	text: string;
};

export interface ISelectProps {
	label: string;
	disabled?: boolean;
	options: OptionType[];
	// onChangeSelect: (option: OptionType) => void;
	// selected: OptionType;
}

const Select = ({ label, disabled, options }: ISelectProps) => {
	const [activeState, setActiveState] = useState(false);
	const [selected, setSelected] = useState<OptionType>({
		value: '',
		text: '',
	});
	const [labelWidth, setLabelWidth] = useState(0);
	const labelRef = useRef<HTMLLabelElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		setLabelWidth(labelRef.current ? labelRef.current.getBoundingClientRect().width : 0);
	}, [labelRef]);

	const labelClasses = [s['label'], activeState ? s['active'] : ''].join(' ');

	const onChangeSelect = (option: OptionType) => {
		setSelected((prev) => ({ ...prev, ...option }));
	};
	const handleOnFocus = () => {
		setActiveState(true);
	};
	const handleOnClick = () => {
		setShowDropdown((prev) => !prev);
	};

	const handleOnBlur = () => {
		setActiveState(Boolean(selected.text));
		setShowDropdown(false);
	};

	const handleClickOption = (
		option: OptionType,
		event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
	) => {
		event.stopPropagation();
		onChangeSelect(option);
		setShowDropdown(false);
	};

	const containerClasses = [s['container'], s['outlined'], disabled ? s['disabled'] : ''].join(' ');
	const arrowClasses = [s['arrow'], showDropdown ? s['arrowUp'] : s['arrowDown']].join(' ');

	return (
		<div
			className={containerClasses}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			onClick={handleOnClick}
			tabIndex={-1}
		>
			<div className={s['body']}>
				<label className={labelClasses} ref={labelRef}>
					{label}
				</label>
				<p className={s['selectedText']}>{selected.text}</p>
				<button className={s['arrowBtn']}>
					<span className={arrowClasses}></span>
				</button>
				<p
					className={`${activeState ? `${s['coverActive']} ` : ''} ${s['cover']}`}
					style={{ width: labelWidth }}
				/>
			</div>
			{showDropdown && (
				<ul className={s.list}>
					{options?.map((option) => (
						<li
							key={option.value}
							value={option.value}
							className={`${s['item']} ${selected.text === option.text ? s['selected'] : ''}`}
							onClick={(e) => handleClickOption(option, e)}
						>
							{option.text}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Select;
