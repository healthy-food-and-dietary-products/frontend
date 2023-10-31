import { ReactNode } from 'react';
import alertIcon from '@images/alert-circle.svg';
import styles from './input-container-wide.module.scss';

type InputContainerWideProps = {
	children: ReactNode;
	inputName: string;
	isError: boolean;
	isAsterisk: boolean;
	errorText?: string;
};

const InputContainerWide = ({
	children,
	inputName,
	isError,
	errorText,
	isAsterisk,
}: InputContainerWideProps) => {
	return (
		<div className={styles.container}>
			<p
				className={`${styles.container__name} ${
					isAsterisk && styles['container__name_type_asterisk']
				}`}
			>
				{inputName}
			</p>
			<div className={styles['inner-container']}>
				{children}
				<input className={styles['inner-container__input']} type="text" />
				{isError && (
					<div className={styles['inner-container__img-wrapper']}>
						<img className={styles['inner-container__img']} src={alertIcon} alt="icon" />
					</div>
				)}
			</div>
			{isError && <p className={styles.container__error}>{errorText}</p>}
		</div>
	);
};

export default InputContainerWide;
