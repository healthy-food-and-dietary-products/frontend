import styles from './user-title.module.scss';
import img from '@images/profile/profile_icon_major.svg';
import clsx from 'clsx';
import BagIcon from '@images/profile/bag.svg?react';

export default function UserTitle() {
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
			<p className={clsx(styles.title, 'text-m')}>UserName</p>
			<BagIcon />
		</div>
	);
}
