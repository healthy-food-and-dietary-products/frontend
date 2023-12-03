import { useContext } from 'react';
import CreateFavoriteContext from '@contexts/create-favorite-context';

export function useCreateFavorite() {
	const context = useContext(CreateFavoriteContext);
	if (context === undefined) {
		throw new Error('useCreateFavorite must be used within an CreateFavoriteProvider');
	}
	return context;
}
