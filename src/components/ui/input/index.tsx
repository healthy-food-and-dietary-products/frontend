import styles from './input.module.scss';

type InputProps = {
	inputName: string;
};

const Input = ({ inputName }: InputProps) => {
	return (
		<label className={styles.label}>
			<span className={styles.spanBefore}>{inputName}</span>
			<input className={`${styles.input_type_normal} ${styles.input_type_error_111}`} />
			<span
				className={`${styles.spanAfter_type_normal} ${styles.spanAfter_type_error_111}`}
			>
				Указанный почтовый адрес не существует, попробуйте еще раз
			</span>
		</label>
	);
};

export default Input;
