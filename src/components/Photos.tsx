import {Photo} from '@/types';
import {ArrowDownToLine} from 'lucide-react';

export const Photos = (photo: Photo) => {
	return (
		<div key={photo.id} className='mb-1 relative group'>
			<img src={photo.photoURL} alt={photo.id} className='w-full' />

			<div className='absolute bottom-5 left-0 '>
				<a
					className='bg-zinc-900 text-white rounded-md p-2 cursor-pointer flex items-center justify-center'
					download={photo.photoURL}
				>
					<ArrowDownToLine />
				</a>
			</div>
		</div>
	);
};
