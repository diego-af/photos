import {db, storage} from '@/service/firebase.config';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {useRef, useState} from 'react';
import {collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import {Photo} from '@/types';
import {userValid} from '@/hooks/userValid';
import {toast} from 'sonner';

export const useGalleryViewModel = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [photo, setPhoto] = useState<string | null>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [photos, setPhotos] = useState<Photo[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [savePhotIsLoading, setSavePhotoIsLoading] = useState(false);

	const user = userValid();

	const savePhotoStorage = async (file: File) => {
		setIsLoading(true);
		try {
			// Cria uma referência no Firebase Storage
			const folder = 'imagens'; // Nome da pasta no Firebase Storage
			const fileName = `photo_${Date.now()}.${file.name}`; // Nome único para o arquivo
			const storageRef = ref(storage, `${folder}/${fileName}`);

			// Faz o upload da imagem como uma string base64
			await uploadBytes(storageRef, file);

			// Obtém a URL de download da imagem
			const downloadURL = await getDownloadURL(storageRef);
			setIsLoading(false);
			return downloadURL;
		} catch (error) {
			console.error('Erro ao salvar a foto no Firebase Storage:', error);
			toast('Erro ao salvar a foto no Firebase Storage');
			throw error;
		} finally {
			setIsLoading(false);
		}
	};

	const savePhotoFirestore = async (downloadURL: string) => {
		setSavePhotoIsLoading(true);
		try {
			if (!user) {
				toast('Usuário não autenticado', {
					duration: 5000,
					style: {
						backgroundColor: '#ac7434',
						color: ' #fafafafa'
					}
				});
				throw new Error('Usuário não autenticado!');
			}

			const photosCollection = collection(db, 'photos');

			await addDoc(photosCollection, {
				userId: user.uid, // ID do usuário autenticado
				photoURL: downloadURL, // URL da foto salva no Storage
				createdAt: new Date() // Timestamp
			});

			setSavePhotoIsLoading(false);
			toast('foto salva com sucesso', {
				duration: 5000,
				style: {
					backgroundColor: '#2f6b48',
					color: '#fafafa'
				}
			});
		} catch (error) {
			console.error('Erro ao salvar a foto no Firestore:', error);
			toast('Erro ao salvar a foto no Firestore ', {
				description: 'Tente novamente',
				duration: 5000,
				style: {
					backgroundColor: '#f72929',
					color: ' #fafafafa'
				}
			});
			throw error;
		} finally {
			setSavePhotoIsLoading(false);
		}
	};
	// Função para tirar a foto

	const takePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			if (!file) {
				toast('Nenhuma foto selecionada', {
					duration: 5000,
					style: {
						backgroundColor: '#ac7434',
						color: ' #fafafafa'
					}
				});
				return;
			}

			const downloadURL = await savePhotoStorage(file);

			await savePhotoFirestore(downloadURL);
		}
		fetchUserPhotos();
	};

	const fetchUserPhotos = async () => {
		setIsLoading(true);
		try {
			if (!user) {
				throw new Error('Usuário não autenticado!');
			}

			// Referência à coleção "photos"
			const photosCollection = collection(db, 'photos');

			// Cria uma consulta para buscar apenas as fotos do usuário autenticado
			const userPhotosQuery = query(
				photosCollection,
				where('userId', '==', user.uid)
			);

			// Executa a consulta
			const querySnapshot = await getDocs(userPhotosQuery);

			// Mapeia os documentos para extrair as URLs das fotos
			const photosfetch = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				photoURL: doc.data().photoURL,
				userId: doc.data().userId,
				createdAt: doc.data().createdAt
			}));

			setPhotos(photosfetch); // Atualiza o estado com as fotos do usuário

			setIsLoading(false);
			return photos;
		} catch (error) {
			console.error('Erro ao buscar as fotos do usuário:', error);
			toast('Erro ao carregar fotos', {
				description: 'Tente novamente',
				duration: 5000,
				style: {
					backgroundColor: '#f72929',
					color: ' #fafafafa'
				}
			});
			throw error;
		} finally {
			setIsLoading(false);
		}
	};
	return {
		videoRef,
		canvasRef,
		photo,
		setPhoto,
		stream,
		setStream,
		fetchUserPhotos,
		photos,
		setPhotos,
		takePhoto,
		isLoading,
		savePhotIsLoading
	};
};
