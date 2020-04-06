window.onload = () => {
  // function tretia() {
  //   setTimeout(() => {
  //     console.log('ja som tretie auto');
  //   }, 1000);
  // }
  // function prava() {
  //   console.log('ja som prve auto');
  // }
  // function druha() {
  //   console.log('ja som druhe auto');
  // }

  // prava();
  // druha();
  // tretia();

  // REST API zhluk pravidiel ako spravne pisať requesty https://restfulapi.net/http-methods/

  document.getElementById('button').addEventListener('click', function() {
    // create XHR object
    const xhr = new XMLHttpRequest();

    // GET, POST, PUT, DELETE, PATCH su to REST API metody
    xhr.open('GET', 'data.txt', true);
    console.log('READYSTATE', xhr.readyState);

    // optional tu je priestor na spinners alebo laoders komponenty
    xhr.onprogress = function() {
      console.log('READYSTATE', xhr.readyState);
    };

    xhr.onload = function() {
      console.log('READYSTATE', xhr.readyState);
      if (this.status === 200) {
        document.getElementById(
          'output'
        ).innerHTML = `<h1>${this.responseText}</h1>`;
      }
    };

    xhr.onerror = function() {
      console.log('READYSTATE', xhr.readyState);
      console.log('Request error...');
    };

    xhr.send();
  });

  // readyState Values
  // 0: request nie je inicializovany
  // 1: spojenie so serverom je nadviazane
  // 2: request bol priaty na servery
  // 3: request v procese t.j. v loading stave
  // 4: request skoncil a response je ready

  // HTTP statuses
  // 200: "ok"
  // 403: "Forbidden"
  // 404: "Not Found"
};
