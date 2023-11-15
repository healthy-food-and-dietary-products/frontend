import React, { ReactNode } from 'react';
import Header from '../header';
import Footer from '../footer';
import style from './layout.module.scss';

type LayoutProps = {
	children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={style.layout}>
			<Header />
			<main className={style.layout__main}>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
