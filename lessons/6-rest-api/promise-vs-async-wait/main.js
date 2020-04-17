const posts = ['Post one', 'Post two']

function createPost(post) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			posts.push(post)

			const error = false

			if (!error) {
				resolve()
			} else {
				reject('Error: Something went wrong')
			}
		}, 2000)
	})
}

function getPosts() {
	setTimeout(() => {
		document.getElementById('addDataIntoBody').innerHTML = posts
	}, 1000)
}

const druheVolanie = () => {
	createPost('Post three')
		.then(getPosts)
		.catch(err => console.log(err))
}

const prveVolanie = async () => {
	await createPost('Post three')
	await getPosts()
}

document.getElementById('prvy').addEventListener('click', prveVolanie)
document.getElementById('druhy').addEventListener('click', druheVolanie)
