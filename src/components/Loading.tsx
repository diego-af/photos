export const Loading = () => {
	return (
		<div className='flex items-center justify-center h-screen w-screen absolute bg-zinc-500 opacity-25 z-300 '>
			<div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'>
				Carregando...
			</div>
		</div>
	);
};
