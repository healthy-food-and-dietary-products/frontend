import { useState, useEffect } from 'react';
import styles from './profile-addresses.module.scss';
import InputAddress from '@components/profile-components/input-address';
import { useAuth } from '@hooks/use-auth';
// import api from '@services/api';
import { Address } from '@services/generated-api/data-contracts';
import clsx from 'clsx';

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
	const { user } = useAuth();
	const addresses = user.addresses as Address[];
	// const [addresses, setAddresses] = useState<Address[]>([]);

	const [values, setValues] = useState<stateType>([new Value('', '')]);

	const isVisibleAddButton = Boolean(values.at(-1)?.initialValue);
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

	const deleteAddress = (index: number) => {
		return () => {
			const filteredAddresses = addresses.filter((_, i) => i !== index);
			console.log(filteredAddresses, 'Delete request...');
			// setAddresses(filteredAddresses);
		};
	};

	const changeAddress = (index: number) => {
		return (newAddress: string) => {
			const changedAddresses = addresses.map((addressObj, i) => {
				if (i === index) {
					return { ...addressObj, address: newAddress };
				}
				return addressObj;
			});
			console.log(changedAddresses, 'Change request...');
			// setAddresses(changedAddresses);
		};
	};

	const addAddress = (newAddress: string) => {
		console.log([...addresses, { address: newAddress }], 'Add request...');
		// setAddresses([...addresses, { address: newAddress }]);
	};

	const addInput = () => {
		if (values.length < 4) {
			setValues([...values, new Value('', '')]);
		} else {
			alert(
				'Вы добавили максимально допустимое количество адресов. Чтобы добавить новый адрес, удалите один из текущих'
			);
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
		console.log(changedAddresses, 'Change request...');
		// setAddresses(changedAddresses);
	};

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>Мои адреса</h2>
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.inputs}>
					{values.map((address, i) => (
						<InputAddress
							key={i}
							initialValue={address.initialValue}
							deleteAddress={deleteAddress(i)}
							changeAddress={changeAddress(i)}
							addAddress={addAddress}
							value={address.value}
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
		</div>
	);
}
