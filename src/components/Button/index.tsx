import styles from './button.module.scss';

type ButtonProps = {
	buttonText : string;
	buttonStyle: string;
}

const Button = ({buttonText, buttonStyle} : ButtonProps) => {

	return (
			<button
				type="button"
				className={`${styles[buttonStyle]}`}
			>
				{buttonText}
			</button>
		);
}

export default Button;
