import React from 'react';
import UserTitle from '@components/profile-components/user-title';
import ProfileMenu from '@components/profile-components/profile-menu';
import { Outlet } from 'react-router';
import styles from './profile.module.scss';
import Breadcrumbs from '@components/breadcrumbs';

const Profile: React.FC = () => {
	return (
		<div className={styles.container}>
			<Breadcrumbs isProfilePage={true} />
			<div className={styles.wrapper}>
				<div className={styles.menu}>
					<UserTitle />
					<ProfileMenu />
				</div>
				<section className={styles.content}>
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default Profile;
