import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from 'react';

type ProfileContextType = {
	isProfileMenuOpen: boolean;
	isMobileScreen: boolean;
	setIsProfileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType>({
	isProfileMenuOpen: false,
	isMobileScreen: window.innerWidth <= 768,
	setIsProfileMenuOpen: () => {},
});

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768);
	const [width, setWidth] = useState(window.innerWidth);

	const onResize = () => {
		setIsMobileScreen(window.innerWidth <= 768);
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('resize', onResize);
		}, 100);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, [width]);

	return (
		<ProfileContext.Provider
			value={{ isProfileMenuOpen, setIsProfileMenuOpen, isMobileScreen }}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileContext;
