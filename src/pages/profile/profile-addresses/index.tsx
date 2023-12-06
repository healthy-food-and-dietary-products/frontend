import { useState, useEffect } from 'react';
import styles from './profile-addresses.module.scss';
import InputAddress from '@components/profile-components/input-address';
import { useAuth } from '@hooks/use-auth';
import { useProfile } from '@hooks/use-profile';
import api from '@services/api';
import { Address } from '@services/generated-api/data-contracts';
import clsx from 'clsx';
import PopupAddressesWarning from '@components/popups/popup-addresses-warning';
import PopupAddressesDeleteConfirm from '@components/popups/popup-addresses-delete-confirm';
import ReturnBackButton from '@components/profile-components/return-back-button';
import { usePopup } from '@hooks/use-popup';

type stateType = Array<{ value: string; initialValue: string; isChanged: boolean }>;

class Value {
	value: string;
	initialValue: string;
	constructor(value: string, initialValue: string) {
		this.value = value;
		this.initialValue = initialValue;
	}
	get isChanged() {
		return this.value !== this.initialValue;
	}
}

export default function ProfileAddresses() {
	const { handleOpenPopup } = usePopup();

	const { user, updateUsers } = useAuth();
	const username = user.username as string;
	const email = user.email as string;
	const addresses = user.addresses as Address[];

	const [values, setValues] = useState<stateType>([new Value('', '')]);
	const [isLoading, setIsLoading] = useState(false);
	const [addressesIndex, setAddressesIndex] = useState<number>();
	const { isMobileScreen } = useProfile();

	const isVisibleAddButton =
		Boolean(values.at(-1)?.initialValue) && !values.at(-1)?.isChanged;
	const isAnyValueChanged = values.some((valueObj) => valueObj.isChanged);

	useEffect(() => {
		setValues(
			addresses.length
				? addresses.map((addressObj) => new Value(addressObj.address, addressObj.address))
				: [new Value('', '')]
		);
	}, [addresses]);

	const onChangeValues = (index: number) => {
		return (newValue: string) => {
			const changedValues = values.map((valueObj, i) => {
				if (i === index) {
					valueObj.value = newValue;
				}
				return valueObj;
			});
			setValues(changedValues);
		};
	};

	const sendRequest = (addresses: Address[]) => {
		if (!isLoading) {
			setIsLoading(true);
			api
				.usersMePartialUpdate({ addresses, username, email })
				.then((data) => updateUsers(data))
				.finally(() => setIsLoading(false));
		}
	};

	const deleteAddress = (index: number) => {
		const filteredAddresses = addresses.filter((_, i) => i !== index);
		sendRequest(filteredAddresses);
		setAddressesIndex(undefined);
	};

	const cancelDeleteAddress = () => {
		setAddressesIndex(undefined);
	};

	const changeAddress = () => {
		const changedAddresses = addresses.map((addressObj, index) => {
			if (values[index].isChanged) {
				return { ...addressObj, address: values[index].value };
			}
			return addressObj;
		});
		console.log(changedAddresses);
		sendRequest(changedAddresses);
	};

	const addAddress = (newAddress: string) => {
		sendRequest([...addresses, { address: newAddress }]);
	};

	const openConfirmPopup = (index: number) => {
		setAddressesIndex(index);
		handleOpenPopup('openPopupAddressesDeleteConfirm');
	};

	const handleClickChange = (index: number) => {
		const { value, initialValue } = values[index];
		return () => {
			if (value === '') {
				openConfirmPopup(index);
			} else if (initialValue === '') {
				addAddress(value);
			} else {
				changeAddress();
			}
		};
	};

	const handleClickClose = (index: number) => {
		const { initialValue, isChanged } = values[index];
		return () => {
			if (isChanged) {
				onChangeValues(index)(initialValue);
			} else {
				openConfirmPopup(index);
			}
		};
	};

	const addInput = () => {
		if (values.length < 4) {
			setValues([...values, new Value('', '')]);
		} else {
			handleOpenPopup('openPopupAddressesWarning');
		}
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const changedAddresses = values.map((valueObj, index) => {
			if (valueObj.isChanged) {
				return {
					...addresses[index],
					address: valueObj.value,
				};
			}
			return addresses[index];
		});
		sendRequest(changedAddresses);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<h2 className={styles.title__text}>Мои адреса</h2>
				{isMobileScreen && <ReturnBackButton />}
			</div>
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.inputs}>
					{values.map((address, i) => (
						<InputAddress
							key={i}
							handleClickClose={handleClickClose(i)}
							handleClickChange={handleClickChange(i)}
							valueObj={address}
							onChangeValue={onChangeValues(i)}
							required
						/>
					))}
				</div>
				<div className={styles.buttons}>
					<button
						className={clsx(styles.button, styles.button__safe)}
						type="submit"
						disabled={!isAnyValueChanged}
					>
						Сохранить
					</button>
					{isVisibleAddButton && (
						<button
							onClick={() => addInput()}
							className={clsx(styles.button, styles.button__cancel)}
							type="button"
						>
							Добавить
						</button>
					)}
				</div>
			</form>
			<PopupAddressesWarning />
			{addressesIndex && (
				<PopupAddressesDeleteConfirm
					address={values[addressesIndex].initialValue}
					deleteAddress={() => deleteAddress(addressesIndex)}
					cancelDeleteAddress={cancelDeleteAddress}
				/>
			)}
		</div>
	);
}
