import { createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import api from '@services/api';
import { Product } from '@services/generated-api/data-contracts';

type TCreateFavoriteContext = {
	createFavorite: (id: number) => Promise<Record<string, unknown>>;
	deleteFavorite: (id: number) => Promise<Record<string, unknown>>;
	toggleFavorite: (
		id: number,
		productsArr: Product[],
		setProductsArr: Dispatch<SetStateAction<Product[]>>
	) => () => void;
};

const CreateFavoriteContext = createContext<TCreateFavoriteContext | undefined>(
	undefined
);

export default CreateFavoriteContext;

type Props = {
	children: ReactNode;
};

export function CreateFavoriteProvider({ children }: Props) {
	const createFavorite = (id: number) => {
		return api.productsFavoriteCreate(id);
	};
	const deleteFavorite = (id: number) => {
		return api.productsFavoriteDelete(id);
	};
	const toggleFavorite = (
		id: number,
		productsArr: Product[],
		setProductsArr:
			| Dispatch<SetStateAction<Product[]>>
			| ((changedProducts: Product[]) => void)
	) => {
		return () => {
			const changedProducts = productsArr.map((product) => {
				if (id === product.id) {
					product.is_favorited = !product.is_favorited;
				}
				return product;
			});
			setProductsArr(changedProducts);
		};
	};
	return (
		<CreateFavoriteContext.Provider
			value={{ createFavorite, deleteFavorite, toggleFavorite }}
		>
			{children}
		</CreateFavoriteContext.Provider>
	);
}
