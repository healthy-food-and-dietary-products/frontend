import { useContext } from 'react';
import ProfileContext from '@contexts/profile-context.tsx';

export const useProfile = () => {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error('useProfile must be used within a PrifileProvider');
	}
	return context;
};
