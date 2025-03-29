import {auth} from '@/service/firebase.config';
import {signInWithEmailAndPassword} from 'firebase/auth';

import {useState} from 'react';
import {useNavigate} from 'react-router';
import {toast} from 'sonner';

export const useLoginViewModel = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);

			console.log('Login success:', response);

			localStorage.setItem('user', JSON.stringify(response.user));
			navigate('/galery');
		} catch (error) {
			console.error('Login failed:', error);
			toast('Login falhou', {
				description: 'Senha ou email incorretos',
				duration: 5000,
				style: {
					backgroundColor: '#f72929',
					color: ' #fafafafa'
				},
				position: 'top-center'
			});
		} finally {
			setIsLoading(false);
		}
	};
	return {
		email,
		password,
		setEmail,
		setPassword,
		handleLogin,
		isLoading
	};
};
