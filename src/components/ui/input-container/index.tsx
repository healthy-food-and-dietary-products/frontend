import { ReactNode } from 'react';
import alertIcon from '@images/alert-circle.svg';
import styles from './input-container.module.scss';

type InputContainerProps = {
	children: ReactNode;
	inputName: string;
};

const InputContainer = ({ children, inputName }: InputContainerProps) => {
	return (
		<div className={styles.container}>
			<p className={styles.name}>{inputName}</p>
			<div className={styles.flex}>
				{children}
				<input className={styles.input} type="text" />
				<div className={styles['img-wrapper']}>
					<img className={styles.img} src={alertIcon} alt="icon" />
				</div>
			</div>
			<p className={styles.error}>
				Указанный почтовый адрес не существует, попробуйте еще раз
			</p>
		</div>
	);
};

export default InputContainer;
