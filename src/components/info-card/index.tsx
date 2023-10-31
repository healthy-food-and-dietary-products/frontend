import React from 'react';
import styles from './info-card.module.scss';

type InfoCardProps = {
	title: string;
	description: string;
	imageUrl: string;
	altText: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ title, description, imageUrl, altText }) => {
	return (
		<div className={styles.infoCard}>
			<img className={styles.infoCard__image} src={imageUrl} alt={altText} />
			<div className={styles.infoCard__content}>
				<h2 className={styles.infoCard__title}>{title}</h2>
				<p className={styles.infoCard__description}>{description}</p>
			</div>
		</div>
	);
};

export default InfoCard;
