import clsx from 'clsx';
import styles from './button.module.scss';

export type ButtonDefaultProps = {
	buttonText: string;
	buttonStyle:
		| 'green-border-button'
		| 'green-border-button__active'
		| 'greenish-button'
		| 'green-button';
	classNameActive?: 'greenish-button__active' | '';
	onClick?: () => void;
	disabled?: boolean;
	classNames?: string;
	type?: 'button' | 'submit' | 'reset';
};

const ButtonDefault = ({
	buttonText,
	buttonStyle,
	classNameActive,
	onClick,
	disabled,
	classNames,
	type,
}: ButtonDefaultProps) => {
	return (
		<button
			type={type ? type : 'button'}
			className={clsx(
				styles[buttonStyle],
				classNameActive && styles[classNameActive],
				classNames
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{buttonText}
		</button>
	);
};

export default ButtonDefault;
