import React from 'react';
import styles from './input.module.scss';

type InputProps = {
	inputNameSpan: string;
	error?: Record<string, unknown>;
	isValid: boolean;
	withErrorSpan?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props: InputProps) => {
	const { inputNameSpan, error, isValid, withErrorSpan, ...inputProps } = props;
	const hasError = error && error[inputProps.name || ''];

	return (
		<label className={styles.label}>
			<span className={styles.spanBefore}>{inputNameSpan}</span>
			<input
				className={`${styles.input_type_normal} ${
					hasError && !isValid ? `${styles.input_type_error}` : ''
				}`}
				value={inputProps.value !== undefined ? String(inputProps.value) : ''}
				{...inputProps}
			/>
			{withErrorSpan && <span className={styles.spanAfter}>{hasError as string}</span>}
		</label>
	);
};

export default Input;
