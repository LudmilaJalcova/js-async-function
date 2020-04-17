// vytvor si index.html v ktorom budes mat nalinkovany main.js subor
// v main.js subre vytvor asynchronu funkciu pomocou async a await nazvi ju getUsers()

// url je https://jsonplaceholder.typicode.com/users

// pomocou fetch ziskaj json a response vloz do body ako text

// class EasyHTTP {
// 	async getUsers(url) {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		return data;
// 	}
// }

const createUser = async () => {
	// try {
	// 	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	// 	let users = []
	// 	users = await response.json()

	// 	users => {
	// 		users.map(user => {
	// 			const userName = `<div>Name: ${user.name}</div>`
	// 			document.getElementById('addDataIntoBody').innerHTML += userName
	// 		})
	// 	}
	// } catch (err) {
	// 	throw new Error(err)
	// }
	await fetch('https://jsonplaceholder.typicode.com/usersk')
		.then(response => response.json())
		.then(users => {
			users.map(user => {
				const userName = `<div>Name: ${user.name}</div>`
				document.getElementById('addDataIntoBody').innerHTML += userName
			})
		})
		.catch(err => {
			throw new Error(err)
		})
}
document.getElementById('btnGet').addEventListener('click', createUser)
