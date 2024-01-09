export const getPaymentMethodRu = (paymentMethod: string) => {
	switch (paymentMethod) {
		case 'Payment at the point of delivery':
			return 'при самовывозе';
		case 'In getting by cash':
			return 'курьеру';
		case 'Online':
			return 'онлайн';
		default:
			return '';
	}
};

export const getDeliveryMethodRu = (deliveryMethod: string) => {
	switch (deliveryMethod) {
		case 'Point of delivery':
			return 'самовывоз';
		case 'By courier':
			return 'курьером';
		default:
			return '';
	}
};
