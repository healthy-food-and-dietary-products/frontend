import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

type ProfileContextType = {
	isProfileMenuOpen: boolean;
	setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType>({
	isProfileMenuOpen: false,
	setIsProfileMenuOpen: () => {},
});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

	return (
		<ProfileContext.Provider value={{ isProfileMenuOpen, setIsProfileMenuOpen }}>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileContext;
