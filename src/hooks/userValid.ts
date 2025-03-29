import {auth} from '@/service/firebase.config';

export const userValid = () => {
	const userLocal = localStorage.getItem('user');
	const userData = userLocal ? JSON.parse(userLocal) : null;

	const user = auth.currentUser || userData;

	return user;
};
