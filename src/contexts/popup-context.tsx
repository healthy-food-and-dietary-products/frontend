import React, { createContext, ReactNode, useState } from 'react';

type PopupContextType = {
	popupState: {
		openPopup: boolean;
		openPopupLogin: boolean;
		openPopupRegistration: boolean;
	};
	handleOpenPopup: (popupName: string) => void;
	handleClosePopup: (popupName: string) => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [popupState, setPopupState] = useState({
		openPopup: false,
		openPopupLogin: false,
		openPopupRegistration: false,
	});

	const handleOpenPopup = (popupName: string) => {
		setPopupState((prevState) => ({
			...prevState,
			[popupName]: true,
		}));
	};

	const handleClosePopup = (popupName: string) => {
		setPopupState((prevState) => ({
			...prevState,
			[popupName]: false,
		}));
	};

	return (
		<PopupContext.Provider value={{ popupState, handleOpenPopup, handleClosePopup }}>
			{children}
		</PopupContext.Provider>
	);
};

export default PopupContext;
