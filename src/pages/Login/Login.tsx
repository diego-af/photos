import {Layout} from '@/components/Layout';
import {Button} from '@/components/ui/button';
import {useLoginViewModel} from './LoginViewModel';
import {Toaster} from '@/components/ui/sonner';

export const Login = () => {
	const {email, setEmail, password, setPassword, isLoading, handleLogin} =
		useLoginViewModel();

	return (
		<Layout>
			<div className='w-full flex justify-center items-center h-full'>
				<div className='w-full md:w-[700px] flex flex-col gap-5 p-6 justify-center items-center'>
					<h1 className='text-3xl text-center'>Entrar</h1>
					<form
						className='w-full md:w-[600px] flex flex-col gap-5 justify-center items-center'
						onSubmit={(e) => {
							e.preventDefault();
							handleLogin();
						}}
					>
						<div className='w-full flex flex-col gap-2'>
							<label>Digite seu email</label>
							<input
								type='email'
								placeholder='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='w-full border border-zinc-400 rounded-md p-2 outline-0'
							/>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<label>Digite sua senha</label>
							<input
								type='password'
								placeholder='senha'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full border border-zinc-400 rounded-md p-2 outline-0'
							/>
						</div>

						<Button
							type='submit'
							className='w-full bg-zinc-900 text-white rounded-md p-2'
							disabled={isLoading}
						>
							{isLoading ? 'Carregando...' : 'Entrar'}
						</Button>
					</form>
				</div>
			</div>
			<Toaster />
		</Layout>
	);
};
