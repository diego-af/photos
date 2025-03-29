import {initializeApp} from 'firebase/app';
import {getAuth, Auth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCnBq5LMWgCSdBmCe15RIC2LbqrIKxUQNg',
	authDomain: 'travells-992af.firebaseapp.com',
	projectId: 'travells-992af',
	storageBucket: 'travells-992af.appspot.com',
	messagingSenderId: '606706243036',
	appId: '1:606706243036:web:26ac0daa66cddf95bbab19',
	measurementId: 'G-VEZP809H1Y'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {auth, storage, db};
