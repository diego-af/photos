import {createBrowserRouter, Navigate} from 'react-router';
import {Login} from './pages/Login/Login';
import {SignUp} from './pages/SignUp/SignUp';
import {Gallery} from './pages/Gallery/Galerry';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to='/auth' replace />
	},
	{
		path: '/signup',
		element: <SignUp />
	},

	{
		path: '/auth',
		element: <Login />
	},
	{
		path: '/galery',
		element: <Gallery />
	}
]);

export default router;
