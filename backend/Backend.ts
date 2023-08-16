export interface IComment {
	id: number;
	content: string;
	date: number;
	owner: number;
	parent: number;
}

export interface IPost {
	id: number;
	date: number;
	details: string;
	owner: number;
	title: string;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
}

export interface Backend {
	// TODO
	// améliorer/vérifier les null cases
	// vérifier omit des dates aussi ✔
	// TODO

	// comments
	getAllComments: () => Promise<IComment[]>,
	getOneComment:  (id: IComment['id']) => Promise<IComment>,
	addComment:  (data: Omit<IComment, 'id' | 'date'>) => Promise<void>,
	updateComment: (data: IComment) => Promise<void>,
	deleteComment: (id: IComment['id']) => Promise<void>,

	// posts
	getAllPosts: () => Promise<IPost[]>,
	getOnePost: (id: IPost['id']) => Promise<IPost>,
	getPostComments: (id: IPost['id']) => Promise<IComment[] | null>,
	addPost: (data: Omit<IPost, 'id' | 'date'>) => Promise<void>,
	updatePost: (data: IPost) => Promise<void>,
	deletePost: (id: IPost['id']) => Promise<void>,
	getThread: (id: IPost['id']) => Promise<(IPost | IComment)[]>

	// users
	getAllUsers: () => Promise<IUser[]>,
	getOneUser:(id: IUser['id']) => Promise<IUser>,
	getUserComments: (id: IUser['id']) => Promise<IComment[] | null>
	getUserPosts: (id: IUser['id']) => Promise<IPost[] | null>
	addUser: (data: Omit<IUser, 'id'>) => Promise<void>,
	updateUser: (data: IUser) => Promise<void>,
	deleteUser: (id: IUser['id']) => Promise<void>,
}