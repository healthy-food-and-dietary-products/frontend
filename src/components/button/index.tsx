import clsx from 'clsx';
import styles from './button.module.scss';

export type ButtonProps = {
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

const Button = ({
	buttonText,
	buttonStyle,
	classNameActive,
	onClick,
	disabled,
	classNames,
	type,
}: ButtonProps) => {
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

export default Button;
