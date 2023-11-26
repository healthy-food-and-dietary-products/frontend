import clsx from 'clsx';
import styles from './button.module.scss';

type ButtonProps = {
	buttonText: string;
	buttonStyle: string;
	classNameActive?: string;
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
