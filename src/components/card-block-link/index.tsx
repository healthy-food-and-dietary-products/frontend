import styles from './card-block-link.module.scss';
import { Link } from 'react-router-dom';

type CardBlockLinkProps = {
	title: string;
	link: string;
	backgroundImage: string | undefined;
};

function CardBlockLink({ title, link, backgroundImage }: CardBlockLinkProps) {
	return (
		<Link
			className={styles['card-block-link']}
			style={{ backgroundImage: `url('${backgroundImage}')` }}
			// дописать маршрут
			to={`/catalog/${link}`}
		>
			<h3 className={styles['card-block-link__title']}>{title}</h3>
		</Link>
	);
}

export default CardBlockLink;
