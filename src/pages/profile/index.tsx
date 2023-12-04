import React from 'react';
import clsx from 'clsx';
import UserTitle from '@components/profile-components/user-title';
import ProfileMenu from '@components/profile-components/profile-menu';
import { Outlet } from 'react-router';
import styles from './profile.module.scss';
import Breadcrumbs from '@components/breadcrumbs';
import { useProfile } from '@hooks/use-profile';

const Profile: React.FC = () => {
	const { isProfileMenuOpen } = useProfile();

	return (
		<div className={styles.container}>
			<Breadcrumbs />
			<div className={clsx(styles.wrapper, styles.display1)}>
				<div className={clsx(styles.menu, !isProfileMenuOpen && styles.display)}>
					<UserTitle />
					<ProfileMenu />
				</div>
				<section className={clsx(styles.content, isProfileMenuOpen && styles.display)}>
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default Profile;
