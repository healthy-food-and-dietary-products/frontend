import { Navigate, useLocation } from 'react-router-dom';
import React, { ElementType } from 'react';

type ProtectedRouteProps = {
	element: ElementType;
	loggedIn: boolean;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	element: Component,
	loggedIn,
	...props
}) => {
	const location = useLocation();
	return loggedIn ? (
		<Component {...props} />
	) : (
		<Navigate
			to={location.state?.prevPath || '/'}
			state={{ prevPath: location.pathname, isOpenPopupLogin: true }}
			replace
		/>
	);
};
