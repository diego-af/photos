import {AlignJustify} from 'lucide-react';
import {Button} from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from './ui/dropdown-menu';
import {useNavigate} from 'react-router';

export const Header = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/auth');
	};

	return (
		<div className='w-full flex justify-between items-center bg-zinc-900 h-12 px-6'>
			<h1 className='text-white text-center text-1xl font-bold'>
				Galeria de Fotos
			</h1>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='outline'>
						<AlignJustify />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='w-25'>
					<DropdownMenuLabel onClick={handleLogout}>Sair </DropdownMenuLabel>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
