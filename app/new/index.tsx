import React, {useEffect, useState} from 'react'
import {
	ActivityIndicator, Button,
	SafeAreaView,
	// ScrollView,
	StyleSheet,
	Text, TextInput,
	View,
} from 'react-native'

import {useBackend} from "../../backend/useBackend"
import {IPost} from "../../backend/Backend"

const backend = useBackend()

type Form = {
	title: string;
	details: string;
}

const NewPost = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [posts, setPosts] = useState<IPost[]>([])
	const [form, setForm] = useState<Form>({title: '', details: ''})

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

const handleChangeTitle = (title: string) => {
	setForm({
		...form,
		title
	})
}

	const handleChangeDetails = (details: string) => {
		setForm({
			...form,
			details
		})
	}

	const handleSubmit = () => {
		backend.addPost({...form, owner: 906524522143})
	}

	return (
		isLoading
			? <ActivityIndicator size='large'/>
			: (<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.title}>Create a post</Text>
						<Text style={styles.label}>title</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={text => handleChangeTitle(text)}
						/>
						<Text style={styles.label}>details</Text>
						<TextInput
							style={styles.textInput}
							onChangeText={text => handleChangeDetails(text)}
						/>
						<Button
							title='Publier'
							onPress={handleSubmit}
						></Button>
				</View>
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
		marginBottom: 64,
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
	},
	textInput: {
		backgroundColor: "#FFFFFF",
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
})

export default NewPost