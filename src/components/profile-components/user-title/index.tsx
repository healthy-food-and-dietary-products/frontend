import styles from './user-title.module.scss';
import img from '@images/profile/profile_icon_major.svg';
import clsx from 'clsx';
import { useAuth } from '@hooks/use-auth';

export default function UserTitle() {
	const { user } = useAuth();
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log('Download image...');
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.img__wrapper}>
				<img src={img} alt="аватар" className={styles.img} />
			</div>
			<label htmlFor="input" className={styles.button}>
				Изменить фото
				<input id="input" type="file" className={styles.input} onChange={onChange} />
			</label>
			<p className={clsx(styles.title, 'text-m')}>
				{(user.first_name as string) || (user.username as string)}
			</p>
		</div>
	);
}
