import {useEffect} from 'react';
import {useGalleryViewModel} from './GaleryViewModel';
import {Camera} from 'lucide-react';
import {Photos} from '@/components/Photos';
import {Header} from '@/components/Header';
import {Loading} from '@/components/Loading';
import {Toaster} from '@/components/ui/sonner';

export const Gallery = () => {
	const {fetchUserPhotos, takePhoto, photos, isLoading, savePhotIsLoading} =
		useGalleryViewModel();
	const user = localStorage.getItem('user');

	if (!user) {
		window.location.href = '/auth';
	}
	useEffect(() => {
		fetchUserPhotos();
	}, []);

	return (
		<div className='text-center relative h-full w-full '>
			<Header />

			<div className=' bottom-5 right-5 fixed z-50'>
				<input
					id='file-input' // Adiciona um id único
					type='file'
					accept='image/*'
					capture='environment'
					onChange={takePhoto}
					className='hidden' // Esconde o input
				/>

				<label
					htmlFor='file-input' // Associa o label ao input
					className='bg-zinc-900 text-white rounded-md p-2 cursor-pointer flex items-center justify-center'
				>
					<Camera size={40} />
				</label>
			</div>

			{isLoading || savePhotIsLoading ? (
				<Loading />
			) : (
				<div className='columns-2 gap-1 p-1 '>
					{photos.map((photo) => (
						<Photos
							key={photo.id}
							id={photo.id}
							photoURL={photo.photoURL}
							userId={photo.userId}
							createdAt={photo.createdAt}
						/>
					))}
				</div>
			)}
			<Toaster />
		</div>
	);
};
