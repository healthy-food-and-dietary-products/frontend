import React from 'react';
import UserTitle from '@components/profile-components/user-title';
import ProfileMenu from '@components/profile-components/profile-menu';

const Profile: React.FC = () => {
	return (
		<div>
			<UserTitle />
			<ProfileMenu />
		</div>
	);
};

export default Profile;
