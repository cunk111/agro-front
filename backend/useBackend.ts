import axios from 'axios';
import {useMemo} from "react";

import {API_ENDPOINT} from '../config/config';
import {Backend} from "./Backend";

const backend = axios.create({
	baseURL: API_ENDPOINT,
});

// cleans response structure
backend.interceptors.response.use(response => response.data);

export const useBackend = () => {
	return useMemo<Backend>(
			() => ({
				getAllComments: async () => backend.get('/comments/all'),
				getOneComment:  async id => backend.get(`/comments/${id}`),
				addComment:  async data => backend.post('/comments/add', data),
				updateComment: async data => backend.put('/comments/update', data),
				deleteComment: async id => backend.delete(`/comments/delete/${id}`),

				// posts
				getAllPosts: async () => backend.get('/posts/all'),
				getOnePost: async id => backend.get(`/posts/${id}`),
				addPost: async data => backend.post('/posts/add', data),
				updatePost: async data  => backend.put('/posts/update', data),
				deletePost: async id => backend.delete(`/posts/delete/${id}`),
				getPostComments: async id => backend.get(`/posts/${id}/comments`),
				getThread: async id => backend.get(`/posts/${id}/thread`),

				// users
				getAllUsers: async () => backend.get('/users/all'),
				getOneUser: async id => backend.get(`/users/${id}`),
				addUser: async data => backend.post('/users/add', data),
				updateUser: async data => backend.put('/users/update', data),
				deleteUser: async id => backend.delete(`/users/delete/${id}`),
				getUserComments: async id => backend.get(`/users/${id}/comments`),
				getUserPosts: async id => backend.get(`/users/${id}/posts`),
			}),
			[]
	)
}