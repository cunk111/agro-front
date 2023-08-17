import React, {useState, useEffect} from 'react'
import { useGlobalSearchParams } from 'expo-router'
import {
	ActivityIndicator,
	Button,
	// Pressable,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'

import {useBackend} from "../../backend/useBackend"
import {IThread} from "../../backend/Backend"
import {nukeSearchParam} from "../../utils/nukeSearchParam";

const backend = useBackend()

const Thread = () => {
	const [thread, setThread] = useState<IThread | null>(null)
	const [form, setForm] = useState<string>('')

	const {id} = useGlobalSearchParams()

	// how ugly is that
	useEffect(() => {
		// id is whether a string or a string[], but we need a number 😬
		let arg
		if(Array.isArray(id)) {
			arg = id.pop()
			if (!!arg) {
				backend.getThread(arg).then(data => setThread(data))
			}
		} else {
			backend.getThread(id).then(data => setThread(data))
		}
	}, [id])

	const handleTextChange = (text: string) => {
		setForm(text)
	}

	const handleSubmit = () => {
		const arg = nukeSearchParam(id)
		const payload = {
			content: form,
			owner: 906524522143, // TODO
			parent: arg,
		}

		// call hook again to reset view
		backend.addComment(payload).then(() => backend
			.getThread(arg.toString())
			.then(data => setThread(data))
		)
	}

	console.log('thread', thread)
	if (typeof thread === 'object') {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
				<Text style={styles.title}>{thread?.post.title}</Text>
				toto
				{thread?.comments.map(comment => {
					return (
						<View style={styles.buttonContainer} key={comment.id}>
							<Text style={styles.comment}>{comment.content}</Text>
							<Text style={styles.date}>{(comment.date)}</Text>
						</View>
					)
				})}
				<TextInput
					style={styles.textInput}
					onChangeText={text => handleTextChange(text)}
				/>
				<Button
					title='Publier'
					onPress={handleSubmit}
				></Button>
			</View>
		</SafeAreaView>
		)
	}
	return (
		<ActivityIndicator />
	)
}

const styles= StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'space-between',
		width:'100%',
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
		marginBottom: 5,
		padding: 8,
		paddingBottom: 0,
		alignItems: 'center',
		alignContent: 'flex-start',
		justifyContent: 'center',
		borderWidth: 4,
		borderColor: "#ffd33d",
		backgroundColor: "#FFFFFF",
		borderRadius: 18,
	},
	comment: {
		width: '100%',
		height: '100%',
		fontSize: 20,
	},
	date: {
		color: "#1C61C6",
		width: '100%',
		height: '100%',
		fontSize: 10,
		textAlign: 'right',
	},
	textInput: {
		backgroundColor: "#FFFFFF",
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
})

export default Thread
