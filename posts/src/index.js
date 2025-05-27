const app = document.getElementById("app");

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Ошибка запроса:", err.message);
    app.innerHTML = '<p class="error">Ошибка загрузки страницы</p>';
    throw err;
  }
}

async function loadPosts() {
  app.innerHTML = '<h1>Список постов</h1><ul id="post-list">Загрузка</ul>';

  const posts = await safeFetch("https://jsonplaceholder.typicode.com/posts");

  const list = posts
    .map((post) => `<li><a href="?id=${post.id}">${post.title}</a></li>`)
    .join("");

  document.getElementById("post-list").innerHTML = list;
}

async function loadPostDetail(id) {
  const post = await safeFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const comments = await safeFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  );

  app.innerHTML = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <h3>Комментарии:</h3>
    <ul>
      ${comments
        .map((c) => `<li><span class="bold">${c.email}:</span> ${c.body}</li>`)
        .join("")}
    </ul>
    <p><a class="back-button" href="/posts">Назад</a></p>
  `;
}

const postId = getQueryParam("id");
if (postId) {
  loadPostDetail(postId);
} else {
  loadPosts();
}
