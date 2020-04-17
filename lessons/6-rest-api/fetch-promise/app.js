const http = new EasyHTTP()
const btnGet = document.getElementById('get')
const btnGetById = document.getElementById('get-by-id')
const btnPost = document.getElementById('post')
const btnPut = document.getElementById('put')
const btnDelete = document.getElementById('delete')
const btnPatch = document.getElementById('patch')
const table = document.getElementById('table')
const tableErrors = document.getElementById('table-errors')

const showData = (method, data) => {
	const createHtml = `
	    <tr>
	      <td>${method}</td>
	      <td>
	        <div style="
	          overflow: auto;
	          height: 70px;"
	        >${JSON.stringify(data)}</div>
	      </td>
	    </tr>
	    `
	tableErrors.innerHTML += createHtml
}

const showError = (method, error) => {
	const createHtml = `
	    <tr>
	      <td>${method}</td>
	      <td>${error}</td>
	    </tr>
	  `
	table.innerHTML += createHtml
}

btnGet.addEventListener('click', () => {
	// get all posts
	http
		.get('https://jsonplaceholder.typicode.com/posts')
		.then(data => showData('GET', data))
		.catch(err => showError(('GET', err)))
})

const dataPost = {
	title: 'Custom post',
	body: 'This is a custom post'
}

btnPost.addEventListener('click', () => {
	// create post
	http
		.post('https://jsonplaceholder.typicode.com/posts', dataPost)
		.then(data => showData('POST', data))
		.catch(err => showError('POST', err))
})

const dataPut = {
	title: 'Custom post',
	body: 'This is a custom post'
}

btnPut.addEventListener('click', () => {
	// update post by id
	http
		.put('https://jsonplaceholder.typicode.com/posts/1', dataPut)
		.then(data => showData('PUT', data))
		.catch(err => showError('PUT', err))
})

btnDelete.addEventListener('click', () => {
	// delete post by id
	http
		.delete('https://jsonplaceholder.typicode.com/posts/1')
		.then(data => showData('DELETE', data))
		.catch(err => showError('DELETE', err))
})

const dataPatch = {
	title: 'Custom post'
}

btnPatch.addEventListener('click', () => {
	// patch post by id
	http
		.patch('https://jsonplaceholder.typicode.com/posts/1', dataPatch)
		.then(data => showData('PATCH', data))
		.catch(err => showError('PATCH', err))
})
