const posts = [
  { title: 'Post one', body: 'This is post one' },
  { title: 'Post two', body: 'This is post two' }
];

function createPost(post, callback) {
  setTimeout(function() {
    posts.push(post);
    callback();
  }, 2000);
}

function getPosts() {
  setTimeout(function() {
    let output = '';
    posts.forEach(post => {
      output += `<div>${post.title}</div>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

createPost({ title: 'Post three', body: 'This is post three' }, getPosts);
