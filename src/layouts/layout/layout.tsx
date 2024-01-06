import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from '../header';
import Footer from '../footer';
import style from './layout.module.scss';

type LayoutProps = {
	children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const location = useLocation();
	const page = location.pathname;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	return (
		<div className={style.layout}>
			<Header />
			<main className={style.layout__main}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
