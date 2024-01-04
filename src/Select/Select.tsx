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
	onChangeSelect?: (option: OptionType) => void;
	selected?: OptionType;
}

const Select = ({ label, disabled, options, onChangeSelect, selected }: ISelectProps) => {
	const [activeState, setActiveState] = useState(selected?.text ? true : false);
	const [selectedOption, setSelectedOption] = useState<OptionType>(
		selected
			? selected
			: {
					value: '',
					text: '',
				}
	);
	const [labelWidth, setLabelWidth] = useState(0);
	const labelRef = useRef<HTMLLabelElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		setLabelWidth(labelRef.current ? labelRef.current.getBoundingClientRect().width + 4 : 0);
	}, [labelRef]);

	const labelClasses = [s['label'], activeState ? s['active'] : ''].join(' ');
	const containerClasses = [s['container'], s['outlined'], disabled ? s['disabled'] : ''].join(' ');
	const arrowClasses = [s['arrow'], showDropdown ? s['arrowUp'] : s['arrowDown']].join(' ');

	const onChangeSelected = (option: OptionType) => {
		setSelectedOption((prev) => ({ ...prev, ...option }));
		if (onChangeSelect) {
			onChangeSelect(option);
		}
	};
	const handleOnFocus = () => {
		setActiveState(true);
	};
	const handleOnClick = () => {
		setShowDropdown((prev) => !prev);
	};

	const handleOnBlur = () => {
		setActiveState(Boolean(selectedOption.text));
		setShowDropdown(false);
	};

	const handleClickOption = (
		option: OptionType,
		event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
	) => {
		event.stopPropagation();
		onChangeSelected(option);
		setShowDropdown(false);
	};

	return (
		<div
			className={containerClasses}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			onClick={handleOnClick}
			tabIndex={-1}
			data-testid='containerSelect'
		>
			<div className={s['body']}>
				<label className={labelClasses} ref={labelRef} data-testid='label'>
					{label}
				</label>
				<p className={s['selectedText']} data-testid='selectedText'>
					{selectedOption.text}
				</p>
				<button className={s['arrowBtn']}>
					<span className={arrowClasses}></span>
				</button>
				<p
					className={`${activeState ? `${s['coverActive']} ` : ''} ${s['cover']}`}
					style={{ width: labelWidth }}
				/>
			</div>
			{showDropdown && (
				<ul className={s.list} data-testid='list'>
					{options?.map((option) => (
						<li
							key={option.value}
							value={option.value}
							className={`${s['item']} ${selectedOption.text === option.text ? s['selected'] : ''}`}
							onClick={(e) => handleClickOption(option, e)}
							data-testid={option.value}
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
