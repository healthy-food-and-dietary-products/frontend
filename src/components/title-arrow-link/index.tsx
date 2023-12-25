import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import ArrowIcon from '@images/chevron-right-no-stroke.svg?react';
import styles from './title-arrow-link.module.scss';

type TitleArrowLinkProps = {
	title: string;
	link: string;
	type?: string;
};

const TitleArrowLink: React.FC<TitleArrowLinkProps> = ({ title, link, type }) => {
	return (
		<Link to={link} className={styles.link}>
			<p
				className={clsx(
					styles.link__title,
					type === 'catalogPage' && styles.link__title_type_smallFont
				)}
			>
				{title}
			</p>
			<ArrowIcon
				className={clsx(
					styles.link__arrow,
					type === 'catalogPage' && styles.link__arrow_type_small
				)}
			/>
		</Link>
	);
};

export default TitleArrowLink;
