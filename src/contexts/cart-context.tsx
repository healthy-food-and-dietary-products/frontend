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
	final_price: number;
	total_price: number;
	amount: number;
	measure_unit: string;
};

type CartDataItem = {
	count_of_products: number;
	products: ProductItem[];
	total_price: number;
};

type ResponseText = {
	loadCartData: string;
	updateCart: string;
	deleteCart: string;
	clearCart: string;
};

type CartContextType = {
	cartData: CartDataItem;
	loading: boolean;
	cartUpdating: boolean;
	error: ResponseText;
	successText: ResponseText;
	reset: () => void;
	loadCartData: () => void;
	updateCart: (data: Product[]) => void;
	deleteCart: (id: number) => void;
	clearCart: () => void;
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
	error: {
		loadCartData: '',
		updateCart: '',
		deleteCart: '',
		clearCart: '',
	},
	successText: {
		loadCartData: '',
		updateCart: '',
		deleteCart: '',
		clearCart: '',
	},
	cartUpdating: false,
	reset: () => {},
	loadCartData: () => {},
	updateCart: () => {},
	deleteCart: () => {},
	clearCart: () => {},
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
	const [successText, setSuccessText] = useState({
		loadCartData: '',
		updateCart: '',
		deleteCart: '',
		clearCart: '',
	});
	const [error, setError] = useState({
		loadCartData: '',
		updateCart: '',
		deleteCart: '',
		clearCart: '',
	});

	const loadCartData = () => {
		setCartUpdating(true);
		setLoading(true);

		api
			.usersShoppingCartList()
			.then((data) => {
				setCartData(data);
			})
			.catch((error) => {
				setError((prev) => {
					return {
						...prev,
						loadCartData: error.errors?.[0]?.detail || 'Ошибка загрузки корзины покупок',
					};
				});
			})
			.finally(() => {
				setCartUpdating(false);
				setLoading(false);
			});
	};

	const updateCart = (data: Product[]) => {
		reset();
		const updatedCartItem: ShoppingCartItem = {
			products: data,
		};
		setCartUpdating(true);

		api
			.usersShoppingCartCreate(updatedCartItem)
			.then((data) => {
				setCartData(data);
				setSuccessText((prev) => {
					return { ...prev, updateCart: 'Продукты успешно добавлены в корзину' };
				});
			})
			.catch((error) => {
				setError((prev) => {
					return {
						...prev,
						updateCart: error.errors?.[0]?.detail || 'Ошибка обновления корзины покупок',
					};
				});
			})
			.finally(() => {
				setCartUpdating(false);
			});
	};

	const deleteCart = (idProduct: number) => {
		api
			.usersShoppingCartDelete(idProduct)
			.catch((error) => {
				if (error?.errors) {
					setError((prev) => {
						return {
							...prev,
							deleteCart:
								error.errors[0]?.detail || 'Ошибка удаления товара из корзины покупок',
						};
					});
				}
			})
			.finally(() => {
				loadCartData();
			});
	};

	const clearCart = () => {
		api
			.usersShoppingCartDeleteAll()
			.then(({ message }) => {
				loadCartData();
				setSuccessText((prev) => {
					return { ...prev, clearCart: message };
				});
			})
			.catch((error) => {
				setError((prev) => {
					return {
						...prev,
						clearCart: error.errors || 'Ошибка очистки корзины покупок',
					};
				});
			});
	};

	const addItemToCart = (productId: number) => {
		if (!cartUpdating) {
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

	const reset = () => {
		setError((prev) => {
			return { ...prev, updateCart: '' };
		});
		setSuccessText((prev) => {
			return { ...prev, updateCart: '' };
		});
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
				error,
				successText,
				cartUpdating,
				reset,
				loadCartData,
				updateCart,
				deleteCart,
				clearCart,
				addItemToCart,
				removeItemFromCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
