const http = new easyHTTP();
const btnGet = document.getElementById('get');
const btnGetById = document.getElementById('get-by-id');
const btnPost = document.getElementById('post');
const btnPut = document.getElementById('put');
const btnDelete = document.getElementById('delete');
const btnPatch = document.getElementById('patch');
const table = document.getElementById('table');
const tableErrors = document.getElementById('table-errors');

const createTable = (method, err, response, statusCode) => {
  if (err) {
    const createHtml = `
      <tr>
        <td>${method}</td>
        <td>${statusCode}</td>
      </tr>
      `;
    tableErrors.innerHTML += createHtml;
  } else {
    const createHtml = `
      <tr>
        <td>${method}</td>
        <td>${statusCode}</td>
        <td>
          <div style="
            overflow: auto;
            height: 70px;"
          >${response}</div>
        </td>
      </tr>
    `;
    table.innerHTML += createHtml;
  }
};

// get all posts
// http.get('https://jsonplaceholder.typicode.com/posts/', function(err, posts) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

btnGet.addEventListener('click', () => {
  // get all posts
  http.get('https://jsonplaceholder.typicode.com/posts', createTable);
});

// get single post by id
// http.get('https://jsonplaceholder.typicode.com/posts/1', function(err, posts) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

// vytovrit nove tlaticko btnGetById
btnGetById.addEventListener('click', () => {
  console.log('aaa');

  // get all posts
  http.get('https://jsonplaceholder.typicode.com/posts/1', createTable);
});

const dataPost = {
  title: 'Custom post',
  body: 'This is a custom post'
};

btnPost.addEventListener('click', () => {
  // // create post
  http.post(
    'https://jsonplaceholder.typicode.com/posts',
    dataPost,
    createTable
  );
});

const dataPut = {
  title: 'Custom post',
  body: 'This is a custom post'
};

// update post by id
// http.put('https://jsonplaceholder.typicode.com/posts/1', dataPut, function(
//   err,
//   posts
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

btnPut.addEventListener('click', () => {
  // update post by id
  http.put(
    'https://jsonplaceholder.typicode.com/posts/1',
    dataPut,
    createTable
  );
});

// // delete post by id
// http.delete('https://jsonplaceholder.typicode.com/posts/1', function(
//   err,
//   posts
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

btnDelete.addEventListener('click', () => {
  // // delete post by id
  http.delete('https://jsonplaceholder.typicode.com/posts/1', createTable);
});

// // patch post by id
// http.patch('https://jsonplaceholder.typicode.com/posts/1', data, function(
//   err,
//   posts
// ) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(posts);
//   }
// });

const dataPatch = {
  title: 'Custom post'
};

btnPatch.addEventListener('click', () => {
  // // patch post by id

  http.patch(
    'https://jsonplaceholder.typicode.com/posts/1',
    dataPatch,
    createTable
  );
});
