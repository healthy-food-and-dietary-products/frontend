import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '@images/chevron-right-no-stroke.svg?react';
import styles from './title-arrow-link.module.scss';

type TitleArrowLinkProps = {
	title: string;
	link: string;
};

const TitleArrowLink: React.FC<TitleArrowLinkProps> = ({ title, link }) => {
	return (
		<Link to={link} className={styles.link}>
			<p className={styles.link__title}>{title}</p>
			<ArrowIcon className={styles.link__arrow} />
		</Link>
	);
};

export default TitleArrowLink;
