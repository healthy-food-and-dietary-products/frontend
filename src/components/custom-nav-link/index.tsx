import { NavLink, useLocation } from 'react-router-dom';
import React, { ReactNode } from 'react';

type CustomNavLink = {
	to: string;
	className: string;
	classNameActive?: string;
	children: ReactNode;
	onClick?: () => void;
};

const CustomNavLink: React.FC<CustomNavLink> = ({
	to,
	className,
	classNameActive,
	children,
	onClick,
}) => {
	const location = useLocation();
	const pathnameWithHash = location.pathname.concat(location.hash);
	const isActive = pathnameWithHash === to;

	return (
		<NavLink
			to={to}
			className={`${className} ${isActive ? classNameActive : ''}`}
			onClick={onClick}
		>
			{children}
		</NavLink>
	);
};

export default CustomNavLink;
