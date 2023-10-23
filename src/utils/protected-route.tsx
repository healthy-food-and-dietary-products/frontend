import { Navigate } from 'react-router-dom';
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
	return loggedIn ? <Component {...props} /> : <Navigate to="/" />;
};
