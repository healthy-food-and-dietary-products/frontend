import React, { ReactNode } from 'react';
import Header from '../header';
import Footer from '../footer/footer';

type LayoutProps = {
	children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
