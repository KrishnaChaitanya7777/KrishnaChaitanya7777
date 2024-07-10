document.addEventListener('DOMContentLoaded', function() {
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            const postsDiv = document.getElementById('posts');
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `<h2>${post.title}</h2><p>${post.content}</p>`;
                postsDiv.appendChild(postElement);
            });
        });
});
