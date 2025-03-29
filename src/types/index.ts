export interface Photo {
	id: string; // ID do documento no Firestore
	photoURL: string; // URL da foto salva no Firebase Storage
	userId: string; // ID do usuário que enviou a foto
	createdAt: {
		seconds: number; // Timestamp em segundos
		nanoseconds: number; // Timestamp em nanossegundos
	};
}
