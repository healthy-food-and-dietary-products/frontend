import React, { useState } from 'react';
import './drop-down.scss';
import Select, { SingleValue } from 'react-select';

const options = [
	{ value: 'popular', label: 'По популярности' },
	{ value: 'cheap', label: 'Сначала дешевые' },
	{ value: 'expensive', label: 'Сначала дорогие' },
	{ value: 'rating', label: 'По рейтингу' },
];

const DropDown: React.FC = () => {
	const [currentChoose, setCurrentChoose] = useState({
		value: 'choose',
		label: 'Выбрать',
	});

	const onChange = (newValue: SingleValue<{ value: string; label: string }>) => {
		newValue && setCurrentChoose(newValue);
	};

	return (
		<Select
			classNamePrefix="custom-select"
			placeholder="Выбрать"
			onChange={onChange}
			value={currentChoose}
			options={options}
		/>
	);
};

export default DropDown;
