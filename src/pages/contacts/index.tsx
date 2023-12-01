import styles from './contacts.module.scss';
import Breadcrumbs from '@components/breadcrumbs';
import mapImg from '@images/map.png';
import clsx from 'clsx';

export default function Contacts() {
	return (
		<div className={styles.contacts}>
			<div className={styles.contacts__container}>
				<div className={styles.contacts__breadcrumbs}>
					<Breadcrumbs isTall={true} />
				</div>
				<h1 className={styles.contacts__title}>Контакты</h1>
				<p className={styles.contacts__where}>Как нас найти</p>
			</div>
			<div className={styles.contacts__map}>
				<img src={mapImg} alt="Адрес" />
			</div>
			<div className={styles.contacts__container}>
				<div className={clsx(styles.contacts__info, styles.info)}>
					<div className={styles.info__block}>
						<p className={styles.info__title}>ООО «ГудФуд»</p>
						<p className={styles.info__text}>
							ИНН/КПП: <span className={styles.info__text_black}>номер/номер</span>
						</p>
						<p className={styles.info__text}>
							ОГРН: <span className={styles.info__text_black}>номер</span>
						</p>
						<p className={styles.info__text}>Телефон: 8-800-000-444-333</p>
						<p className={styles.info__text}>
							Адрес для переписки:{' '}
							<span className={styles.info__text_black}>юр. адрес</span>
						</p>
					</div>
					<div className={styles.info__block}>
						<p className={clsx(styles.info__title, styles.info__title_address)}>Адрес:</p>
						<p className={clsx(styles.info__text, styles.info__text_address)}>
							г. Москва. Ул Ленина д.1
						</p>
						<p className={styles.info__text}>Режим работы с 10:00-22:00</p>
					</div>
				</div>
			</div>
		</div>
	);
}
