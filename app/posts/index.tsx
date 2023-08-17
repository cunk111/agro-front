import React, {useEffect, useState} from 'react'
import { useRouter } from 'expo-router'
import {
	ActivityIndicator,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import {useBackend} from "../../backend/useBackend"
import {IPost} from "../../backend/Backend"

const backend = useBackend()
const router = useRouter()

const Posts = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [posts, setPosts] = useState<IPost[]>([])

	useEffect(() => {
		backend.getAllPosts()
			.then(data => {
				if (!data) {
					setPosts([])
				}
				console.log('inside useEffect', data)
				setPosts(data)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		isLoading
			? <ActivityIndicator size='large'/>
			: (<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>Welcome</Text>
					<View style={styles.buttonContainer}>
						<Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
							<Text style={styles.buttonLabel}>Press here to create a new post</Text>
						</Pressable>
					</View>
				</View>
				<Text style={styles.label}>or press on this list to enter an existing post</Text>
				<ScrollView>
					<View style={styles.scrollViewContent}>
						{posts.map(post => (
							<View key={post.id} style={styles.listElement}>
								<Pressable onPress={() => router.replace(`http://localhost:8081/posts/${post.id.toString()}`)}>
									<Text style={styles.listElementLabel}>{post.title}</Text>
								</Pressable>
							</View>
						))}
					</View>
				</ScrollView>
			</SafeAreaView>)
	)
}

const styles= StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerContainer: {
		padding: 12,
	},
	title: {
		fontSize: 64,
		marginBottom: 34,
		color: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	buttonContainer: {
		width: 320,
		height: 68,
		marginHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 3,
		borderWidth: 4,
		borderColor: "#ffd33d",
		borderRadius: 18,
	},
	button: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonIcon: {
		paddingRight: 8,
	},
	buttonLabel: {
		color: '#FFFFFF',
		fontSize: 16,
	},
	label: {
		color: '#FFFFFF',
		padding: 24,
		fontSize: 16,
	},
	scrollViewContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	listElement: {
		flexGrow: 100,
		padding: 16,
		borderWidth: 1,
		borderColor: '#25292e',
		borderBottomColor: 'white',

	},
	listElementLabel: {
		color: '#FFFFFF',
		borderBottomColor: '#888888',
		fontSize: 24,
	}
})

export default Posts