import React, { createContext, ReactNode, useEffect, useState } from 'react';
import api from '@services/api.ts';

type CartProviderProps = {
	children: ReactNode;
};

type Product = {
	id: number;
	quantity: number;
};

type ShoppingCartItem = {
	products: Product[];
};

type ProductItem = {
	id: number;
	name: string;
	photo: string;
	category: string;
	quantity: number;
	created_at: number;
	final_price: number;
	total_price: number;
};

type CartDataItem = {
	count_of_products: number;
	products: ProductItem[];
	total_price: number;
};

type CartContextType = {
	cartData: CartDataItem;
	loading: boolean;
	loadCartData: () => void;
	updateCart: (data: Product[]) => void;
	deleteCart: (id: number) => void;
	addItemToCart: (id: number) => void;
	removeItemFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType>({
	cartData: {
		count_of_products: 0,
		products: [],
		total_price: 0,
	},
	loading: true,
	loadCartData: () => {},
	updateCart: () => {},
	deleteCart: () => {},
	addItemToCart: () => {},
	removeItemFromCart: () => {},
});

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cartData, setCartData] = useState<CartDataItem>({
		count_of_products: 0,
		products: [],
		total_price: 0,
	});
	const [cartUpdating, setCartUpdating] = useState(false);
	const [loading, setLoading] = useState(true);

	const loadCartData = () => {
		api
			.usersShoppingCartList()
			.then((data) => {
				setCartData(data);
				setCartUpdating(true);
				setLoading(true);
			})
			.catch((error) => {
				console.error('Error loading cart data:', error);
			})
			.finally(() => {
				setCartUpdating(false);
				setLoading(false);
			});
	};

	const updateCart = (data: Product[]) => {
		const updatedCartItem: ShoppingCartItem = {
			products: data,
		};

		api
			.usersShoppingCartCreate(updatedCartItem)
			.then((data) => {
				setCartData(data);
				setCartUpdating(true);
			})
			.catch((error) => {
				console.error('Error updating cart:', error);
			})
			.finally(() => {
				setCartUpdating(false);
			});
	};

	const deleteCart = (idProduct: number) => {
		api
			.usersShoppingCartDelete(idProduct)
			.finally(() => {
				loadCartData();
			})
			.catch((error) => {
				console.error('Error deleting cart item:', error);
			});
	};

	const addItemToCart = (productId: number) => {
		if (!cartUpdating) {
			console.log(cartUpdating);
			const existingProductIndex = cartData.products.findIndex(
				(product) => product.id === productId
			);

			if (existingProductIndex !== -1) {
				if (cartData.products[existingProductIndex].quantity < 10) {
					cartData.products[existingProductIndex].quantity += 1;
					updateCart([
						{
							id: productId,
							quantity: cartData.products[existingProductIndex]?.quantity,
						},
					]);
				} else {
					console.error('Превышено максимальное количество товара в корзине');
				}
			}
		} else {
			console.log('Корзина обновляется. Пожалуйста, подождите.');
		}
	};

	const removeItemFromCart = (productId: number) => {
		if (!cartUpdating) {
			const existingItemIndex = cartData.products.findIndex(
				(item) => item.id === productId
			);

			if (existingItemIndex !== -1) {
				const existingItem = cartData.products[existingItemIndex];

				if (existingItem.quantity > 1) {
					existingItem.quantity -= 1;
				}

				updateCart([{ id: productId, quantity: existingItem?.quantity || 0 }]);
			}
		} else {
			console.log('Корзина обновляется. Пожалуйста, подождите.');
		}
	};

	useEffect(() => {
		loadCartData();
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartData,
				loading,
				loadCartData,
				updateCart,
				deleteCart,
				addItemToCart,
				removeItemFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
