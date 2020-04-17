class EasyHTTP {
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then((response) => response.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	post(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((response) => response.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	put(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					body: JSON.stringify(data),
				},
			})
				.then((response) => response.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	delete(url) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.then(() => resolve('Resource deleted...'))
				.catch((err) => reject(err));
		});
	}

	patch(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					body: JSON.stringify(data),
				},
			})
				.then((response) => response.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}
}
