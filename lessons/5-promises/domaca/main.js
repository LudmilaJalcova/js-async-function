const btnAno = document.getElementById('btn-ano');
const btnNie = document.getElementById('btn-nie');

function ano() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('ano');

      const error = false;

      if (!error) {
        resolve();
      } else {
        reject('Nieco sa pokazilo');
      }
    }, 3000);
  });
}

function nie() {
  setTimeout(() => {
    console.log('nie');
  }, 1000);
}

// najskor ano potom nie
btnAno.addEventListener('click', () => {
  ano()
    .then(nie)
    .catch((err) => console.log(err));
});

// naskor nie potom ano
btnNie.addEventListener('click', () => {
  ano();
  nie();
});
