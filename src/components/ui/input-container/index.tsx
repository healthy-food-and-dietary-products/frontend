import { ReactNode } from 'react';
import alertIcon from '@images/alert-circle.svg';
import styles from './input-container.module.scss';

type InputContainerProps = {
	children: ReactNode;
	inputName: string;
	isError: boolean;
	errorText?: string;
};

const InputContainer = ({
	children,
	inputName,
	isError,
	errorText,
}: InputContainerProps) => {
	return (
		<div className={styles.container}>
			<p className={styles.container__name}>{inputName}</p>
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

export default InputContainer;
