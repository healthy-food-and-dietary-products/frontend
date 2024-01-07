import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import Header from '../header';
import Footer from '../footer';
import style from './layout.module.scss';

type LayoutProps = {
	children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className={style.layout}>
			<Header />
			<main className={style.layout__main}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
