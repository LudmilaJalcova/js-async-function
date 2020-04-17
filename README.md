# Back - end v javascripte

## Request, asynchronná funkcia

Request je požiadavka na server pomocou url alebo csety k suboru na zaklade požiadavky.

asynchronná funkcia napr `setTimeout` ide o funkciu ktorá prebieha teda je volaná a čaká sa na jej výsledok ktorí nie je stanovený rovnako.<br>

počkať na výsledok asynchronnej funkcie vieme pomocou:

- callback
- new promise
- async await

1. `Callback` je funkcia, ktorá sa má zavolať po dokončení inej funkcie<br>

v tomto príklade getPosts volaná funkcia vráti pole bez doplneného nového prvku v poli<br>

```js
const posts = [
	{ title: 'Post one', body: 'this is post one' },
	{ title: 'Post two', body: 'this is post two' }
]

const createPosts = post => {
	setTimeout(() => {
		posts.push(post)
	}, 2000)
}

const getPosts = () => {
	setTimeout(() => {
		let output = ''
		posts.forEach(post => {
			output += `<div>${post.title}</div>`
		})
		document.body.innerHTML = output
	}, 1000)
}

createPosts({ title: 'Post tree', body: 'this is post tree' })

getPosts()
```

pomocou callbacku vieme zabezpečiť vrátenie všetkých troch prvkov z poľa aj s novým prvkom

```js
const createPosts = (post, callback) => {
	// druhy parameter je callback
	setTimeout(() => {
		posts.push(post)
		callback() // tu je volany callaback
	}, 5000)
}

const getPosts = () => {
	setTimeout(() => {
		let output = ''
		posts.forEach(post => {
			output += `<div>${post.title}</div>`
		})
		document.body.innerHTML = output
	}, 1000)
}

createPosts({ title: 'Post tree', body: 'this is post tree' }, getPosts)
```

- tvorba callbacku [example](./lessons/4-callback-rest-api/easy/)

## Tvorba requestov pomocou:

- objekt `XMLHttpRequest()`
- metoda `fetch`

1. objekt na tvorbu requestov `XMLHttpRequest()`

- používa sa na preposielanie dát medzi webovým serverom na pozadí stránky.
- je možné aktualizovať stránku bez refreshu danej stránky.
- podpora je skoro všade (Chrome, Firefox, IE7+, Edge, Safari, Opera)

examples:

- [request-text](./lessons/1-request-text/)
- [request-json](./lessons/2-request-json/)
- [request-url](./lessons/3-request-url-jokes-chn/)

inštanciu tohto objektu si vytváram

```js
const xhr = new XMLHttpRequest()
```

METÓDY vrámci requestov, ktoré môžem vykonávať sú:

- GET slúži na sťiahnutie dát z daného serveru
- POST slúži na zasielanie teda vytvaranie dát do serveru
- PUT slúži na prepisanie viacerých dát v servery
- DELETE slúži na zmazanie dát zo serveru
- PATCH slúži na prepísanie určitej zložky v dátach v servery

vytvorenie requestu

```js
// xhr.open(METODA, url alebo cesta k súboru, asynchronne volanie alebo nie);
xhr.open('GET', 'data.txt', true)
```

zaslanie vytvoreného requestu

```js
xhr.send()
```

zachytenie priebehu volania requestu

```js
xhr.onprogress = function () {
	console.log('READYSTATE', xhr.readyState)
}
```

zachytenie dát po správnom zaslaní requestu a prijatie správneho responsu sa vykona takto

```js
xhr.onload = function () {
	console.log('READYSTATE', xhr.readyState)
	if (this.status === 200) {
		document.getElementById(
			'output'
		).innerHTML = `<h1>${this.responseText}</h1>`
	}
}
```

zachytenie erroru pri nesprávnom requeste

```js
xhr.onerror = function () {
	console.log('READYSTATE', xhr.readyState)
	console.log('Request error...')
}
```

xhr vlastnosti pri volani:

- xhr.readyState vracia to akutálny stav počas vykonávania requestu
  jednotlivé čísla, ktoré môžme očakávať a ich popis:<br>
  0: request nie je inicializovaný<br>
  1: spojenie so serverom je nadviazané<br>
  2: request bol prijatý na servery<br>
  3: request v procese t.j. v loading stave<br>
  4: request skončil a response je ready<br>
- xhr.responseText reprezentuje response teda dáta, ktoré nám prídu od serveru ako string
- xhr.status reprezentuje stav requestu podľa rest api normy
  HTTP statuses<br>
  200: "ok"<br>
  403: "Forbidden"<br>
  404: "Not Found"<br>
  viac info o status code [link](https://www.w3schools.com/tags/ref_httpmessages.asp)<br>
- xhr.statusText reprezentuje status text, ktorý je definovaný pri volaní reuestu na servery napr. 'ok' alebo 'not found'
- xhr.setRequestHeader(header, value) slúži na definovanie pri metódach aké dáta zasielam serveru t.j.:
  -> xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded") - html data vramci formularu [link](https://www.w3schools.com/xml/tryit.asp?filename=tryajax_post2)
  -> xhr.setRequestHeader("Content-type", "text/plain; charset=UTF-8") - typ daneho requestu je text)
  -> xhr.setRequestHeader("Content-type", "application/json") - html data vramci formularu

### Príklady všetkých REST API methods pomocou `XMLHttpRequest()` s callback funkciou a použitia publick test api [https://jsonplaceholder.typicode.com/posts/](https://jsonplaceholder.typicode.com/posts/)

- [priklad](./lessons/4-callback-rest-api/callback)

2. callback vs ES6 promise((resolve, reject) => {})

vramci asynchronného kodu ak chcem počkať na výsledok mam dve možnosti ako získať výsledný stav volania asychnronej funkcie. A to pomocou:

- Callback [demo](./lessons/5-promise/callback-example)
  funguje to tak že definujem si funkciu ktorú budem volať vo funkcii na mieste kde chcem počkať na určitý vysledok ktorí nechcem predbehnúť.

```js
const posts = ['Post one', 'Post two']

function createPost(post, callback) {
	setTimeout(function () {
		posts.push(post)
		callback()
	}, 2000)
}

function getPosts() {
	setTimeout(function () {
		console.log(posts)
	}, 1000)
}

createPost('Post three', getPosts)
```

- Promise [priklad](./lessons/5-promise/promise-example)
  vdaka promisu viem vytvorit dve oddelene funkcie. ak využivam `new Promise((resolve, reject) => {})` viem pomocou metody `resolve()` povedať v ktorom riadku je daný sľub promisu dokončený a vratiť výsledok pri volaní funkcie s promisom ak je tam error využívam na to metodu `reject()`.

```js
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
		console.log(posts)
	}, 1000)
}

createPost('Post three')
	.then(getPosts)
	.catch(err => console.log(err))
```

### REST API meotdy pomocou `fetch().then().catch()`

REST - Representational State Transfer
API - Application programming interface

REST API slúži na prenos dát. Najčastejším protokolom v súčastnosti je HTTP ale bezpečnejšie je HTTPS

METÓDY:

- GET slúži na sťiahnutie dát z daného serveru
- POST slúži na zasielanie teda vytvaranie dát do serveru
- PUT slúži na prepisanie viacerých dát v servery
- DELETE slúži na zmazanie dát zo serveru
- PATCH slúži na prepísanie určitej zložky v dátach v servery

viac [info](https://robime.it/co-je-vlastne-representational-state-transfer-rest/)

fetch je asynchronná metoda ktorá vie vykonať request (GET, POST, PUT, DELETE, PATCH).
Vrámci fetch volania sa dá počkať na výsledok pomocou zapisu

```js
fetch(url).then(vysledok => {
	console.log(vysledok)
})
```

ak je chcem získať výsledok fetch volania musím vytvoriť medzi krok

```js
fetch(url)
	.then(vysledok => {
		console.log(vysledok)
		return vysledok.json()
	})
	.then(data => {
		console.log(data)
	})
```

ak chcem vramci fetch volania zachytiti error vykonam to pomocou `catch()`

```js
fetch(url)
	.then(vysledok => {
		console.log(vysledok)
		return vysledok.json()
	})
	.then(data => {
		console.log(data)
	})
	.catch(err => {
		throw new Error(err)
	})
```

v js ak chcem zaznamenat chybu v kode a nedovolit pokracovat v citani kodu po najdenej chybe použíjem `throw 'moja super duper chyba'` ak chcem okrem zastavenia kodu zaslat message zapisem to takto `throw new Error('moja super duper chyba')`.

- [priklad fetch requestov pre kazdy REST API pomocou new Promise()](./lessons/6-rest-api/fetch-promise)

### async await fetch().then().then().catch()

`new Promise` slúži ako slúb že z danej asynchronej funkcie sa vráti výsledok. Začiatok promisu je v prebiehajucom sľube teda pending. Vramci tohto sľubu viem povedať kedy je daný sľub splnený pomocou metody `resolve()` a kedy nie je splnený a to je `reject()`.<br>
`async` označuje asynchronnu funkciu a označuje, že táto funkcia vracia `new Promise`. Vždy vracia sľub.<br>
`await` je klučove slovo, ktoré slúži na pozastavenie vykonania `async` funkcie, počkanie na vysledok sľubu v danom promise alebo v danej asynchronej funkcii.

```js
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
```

použitie async a await pri requeste:

```js
const createUser = async () => {
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

createUser()
```

alebo

```js
const createUser = async () => {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/users')
		let users = []
		users = await response.json()

		users => {
			users.map(user => {
				const userName = `<div>Name: ${user.name}</div>`
				document.getElementById('addDataIntoBody').innerHTML += userName
			})
		}
	} catch (err) {
		throw new Error(err)
	}
}
createUser()
```

Priklady rest api:

- [fetch + promise](lessons/6-rest-api/fetch-promise)
- [fetch + async await](lessons/6-rest-api/fetch-async-await)
