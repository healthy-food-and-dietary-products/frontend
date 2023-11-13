import React from 'react';
import styles from './input.module.scss';

type InputProps = {
	inputNameSpan: string;
	error?: Record<string, unknown>;
	name: string;
	isValid: boolean;
	type: string;
	id: string;
	minLength?: number;
	maxLength?: number;
	placeholder?: string;
	value: unknown;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
	const hasError = props.error && props.error[props.name];

	return (
		<label className={styles.label}>
			<span className={styles.spanBefore}>{props.inputNameSpan}</span>
			<input
				className={`${styles.input_type_normal} ${
					hasError && !props.isValid ? `${styles.input_type_error}` : ''
				}`}
				type={props.type}
				name={props.name}
				id={props.id}
				minLength={props.minLength}
				maxLength={props.maxLength}
				placeholder={props.placeholder}
				value={props.value !== undefined ? String(props.value) : ''}
				onChange={props.onChange}
				required
			/>
		</label>
	);
};

export default Input;
