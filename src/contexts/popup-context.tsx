import React, { createContext, ReactNode, useState } from 'react';

type PopupState = {
	openPopupCheckEmail: boolean;
	openPopupLogin: boolean;
	openPopupRegistration: boolean;
	openPopupLogout: boolean;
	openPopupAddressesWarning: boolean;
	openPopupAddressesDeleteConfirm: boolean;
	openPopupRecipe: boolean;
};

type PopupContextType = {
	popupState: PopupState;
	handleOpenPopup: (popupName: keyof PopupState) => void;
	handleClosePopup: (popupName: keyof PopupState) => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [popupState, setPopupState] = useState({
		openPopupCheckEmail: false,
		openPopupLogin: false,
		openPopupRegistration: false,
		openPopupLogout: false,
		openPopupAddressesWarning: false,
		openPopupAddressesDeleteConfirm: false,
		openPopupRecipe: false,
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
