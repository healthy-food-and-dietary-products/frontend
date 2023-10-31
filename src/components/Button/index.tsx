import styles from './button.module.scss';

type ButtonProps = {
	buttonText: string;
	buttonStyle: string;
	classNameActive?: string;
	onClick?: () => void;
};

const Button = ({ buttonText, buttonStyle, classNameActive, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			className={`${styles[buttonStyle]}  ${
				classNameActive ? styles[classNameActive] : ''
			}`}
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
};

export default Button;
