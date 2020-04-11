# js-async-function

## objekt `XMLHttpRequest()`

- používa sa na preposielanie dát medzi webovým serverom na pozadí stránky.
- je možné aktualizovať stránku bez refreshu danej stránky.
- podpora je skoro všade (Chrome, Firefox, IE7+, Edge, Safari, Opera)

examples:

- [request-text](./lessons/../1-request-text/)
- [request-json](./lessons/../2-request-json/)
- [request-url](./lessons/../3-request-url-jokes-chn/)

inštanciu tohto objektu si vytváram

```js
const xhr = new XMLHttpRequest();
```

METÓDY vrámci requestov, ktoré môžem vykonávať sú:

- GET slúži na sťiahnutie dát z daného serveru
- POST slúži na zasielanie dát do serveru
- PUT slúži na prepisanie viacerých dát v servery
- DELETE slúži na zmazanie dát zo serveru
- PATCH slúži na prepísanie určitej zložky v dátach v servery

vytvorenie requestu

```js
// xhr.open(METODA, url alebo cesta k súboru, asynchronne volanie alebo nie);
xhr.open('GET', 'data.txt', true);
```

zaslanie vytvoreného requestu

```js
xhr.send();
```

zachytenie priebehu volania requestu

```js
xhr.onprogress = function () {
	console.log('READYSTATE', xhr.readyState);
};
```

zachytenie dát po správnom zaslaní requestu a prijatie správneho responsu sa vykona takto

```js
xhr.onload = function () {
	console.log('READYSTATE', xhr.readyState);
	if (this.status === 200) {
		document.getElementById(
			'output'
		).innerHTML = `<h1>${this.responseText}</h1>`;
	}
};
```

zachytenie erroru pri nesprávnom requeste

```js
xhr.onerror = function () {
	console.log('READYSTATE', xhr.readyState);
	console.log('Request error...');
};
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

## Callback [example](./4-callback-rest-api/easy/)

- je funkcia, ktorá sa má zavolať po dokončení inej funkcie

v tomto príklade getPosts volaná funkcia vráti pole bez doplneného nového prvku v poli

```js
const posts = [
	{ title: 'Post one', body: 'this is post one' },
	{ title: 'Post two', body: 'this is post two' },
];

const createPosts = (post) => {
	setTimeout(() => {
		posts.push(post);
	}, 2000);
};

const getPosts = () => {
	setTimeout(() => {
		let output = '';
		posts.forEach((post) => {
			output += `<div>${post.title}</div>`;
		});
		document.body.innerHTML = output;
	}, 1000);
};

createPosts({ title: 'Post tree', body: 'this is post tree' });

getPosts();
```

pomocou callbacku vieme zabezpečiť vrátenie všetkých troch prvkov z poľa aj s novým prvkom

```js
const createPosts = (post, callback) => {
	// druhy parameter je callback
	setTimeout(() => {
		posts.push(post);
		callback(); // tu je volany callaback
	}, 5000);
};

const getPosts = () => {
	setTimeout(() => {
		let output = '';
		posts.forEach((post) => {
			output += `<div>${post.title}</div>`;
		});
		document.body.innerHTML = output;
	}, 1000);
};

createPosts({ title: 'Post tree', body: 'this is post tree' }, getPosts);
```

## Príklady všetkých REST API methods pomocou `XMLHttpRequest()` a použitia publick test api [https://jsonplaceholder.typicode.com/posts/](https://jsonplaceholder.typicode.com/posts/)

- [Demo](./4-callback-rest-api/request)

## callback vs ES6 promise((resolve, reject) => {}), then(), catch()

vramci asynchronného kodu ak chcem počkať na výsledok mam dve možnosti ako získať výsledný stav volania asychnronej funkcie. A to pomocou:

- Callback [Demo](./5-promise/callback-example)
  funguje to tak že definujem si funkciu ktorú budem volať vo funkcii na mieste kde chcem počkať na určitý vysledok ktorí nechcem predbehnúť.

```js
const posts = ['Post one', 'Post two'];

function createPost(post, callback) {
	setTimeout(function () {
		posts.push(post);
		callback();
	}, 2000);
}

function getPosts() {
	setTimeout(function () {
		console.log(posts);
	}, 1000);
}

createPost('Post three', getPosts);
```

- Promise [Demo](./5-promise/promise-example)
  vdaka promisu viem vytvorit dve oddelene funkcie. ak využivam `new Promise((resolve, reject) => {})` viem pomocou metody `resolve()` povedať v ktorom riadku je daný sľub promisu dokončený a vratiť výsledok pri volaní funkcie s promisom ak je tam error využívam na to metodu `reject()`.

```js
const posts = ['Post one', 'Post two'];

function createPost(post) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			posts.push(post);

			const error = false;

			if (!error) {
				resolve();
			} else {
				reject('Error: Something went wrong');
			}
		}, 2000);
	});
}

function getPosts() {
	setTimeout(() => {
		console.log(posts);
	}, 1000);
}

createPost('Post three')
	.then(getPosts)
	.catch((err) => console.log(err));
```

## Requesty pomocou `fetch()` [link](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

pomocou tejto globalnej metody vieme vykonať každú request metodu podľa REST API

- [Demo](./5-promises/fetch)

## REST API meotdy pomocou `fetch)` spolu s `promise()`
