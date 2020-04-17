const sayHello = () => {
	console.log('hello');
};
// jedno riadkova funkcia nepotrebuje kucerave zatvorky
const sayHello = () => console.log('hello');

// jeden riadok vrati string
const getHello = () => 'Hello';

// vratenie objektu
const getObjectHello = () => ({ msg: 'hello ' });

// vratenie pola
const getArrayHello = () => ['hello1', 'hello2'];

// ak mam jeden vstupny parameter nie je povinost mat to obalene v zatvorke
const createHello = (name) => console.log(name);

// ak mam dve vstupne parametre musim to obalit zatvorkou
const createUser = (firstName, lastName) => console.log(firstName, lastName);

const getText = () => {
	fetch('data.txt')
		.then((res) => res.text())
		.then((data) => {
			console.log(data);
			document.getElementById('output').innerHTML = data;
		})
		.catch((err) => console.error(err));
};
document.getElementById('buttonData').addEventListener('click', getText);
// es5 function vieme volat aj z neskorsieho zapisu
// function getText() {
// 	fetch('data.txt')
// 		.then((res) => res.text())
// 		.then((data) => {
// 			console.log(data);
// 			document.getElementById('output').innerHTML = data;
// 		})
// 		.catch((err) => console.error(err));
// }

// druha funkcia klik ktora bude volat po kliknuti getJson

// definujem funkciu getJson ktora vytvori pomocou fetch metody request
// a stiahne mi customers.json namiesto res.text() pouzijes res.json()
// output je potrebne vykreslit ako zoznam viacerych elemntov a vlozit to z informaciami z jsonu do output

const getJson = () => {
	fetch('customers.json')
		.then((res) => res.json())
		.then((customers) => {
			customers.map((customer) => {
				const customerInfo = `
					<li>ID: ${customer.id}</li>
					<li>Name: ${customer.name}</li>
					<li>Company: ${customer.company}</li>
					<li>Phone: ${customer.phone}</li>
			`;
				document.getElementById('output').innerHTML += customerInfo;
			});
		})
		.catch((err) => console.log(err));
};
document.getElementById('buttonJson').addEventListener('click', getJson);

// tretia funkcia klik ktora bude voalt getExternal

// tretia funkcia bude getExternal
// pouzije fetch metodu na volanie requestu z url adresy 'https://api.github.com/users' data prichadzaju ako json pouzijes res.json()
// takisto to spracuj ako v metode getJson
const getExternal = () => {
	fetch('https://api.github.com/users')
		.then((res) => res.json())
		.then((users) => {
			users.map((user) => {
				const userInfo = `
					<li>ID: ${user.id}</li>
					<li>Login: ${user.login}</li>
					`;
				document.getElementById('output').innerHTML += userInfo;
			});
		})
		.catch((err) => console.log(err));
};
document
	.getElementById('buttonExternal')
	.addEventListener('click', getExternal);

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
