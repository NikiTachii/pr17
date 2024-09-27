"use strict";
// let promise = fetch(url, [options])

async function getResponse() {
  let response = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await response.json();
  posts.slice(0, 15).forEach((element) => {
    document.querySelector(".posts").innerHTML += `
            <div data-index="${element.id}" class="post">
                <div class="post__title">
                    ${element.title}
                </div>
            </div>
        `;
  });
}
getResponse();

document.querySelector(".posts").addEventListener("click", function (event) {
  let target = event.target.closest(".post");
  if (!target) return;

  document.querySelector(".posts").style.display = "none";
  let postId = target.dataset.index;
  async function getPost() {
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    let post = await response.json();
    document.querySelector(".full__post").innerHTML = `
            <div class="post">
                <div class="name">${post.title}</div>
                <div class="text">${post.body}</div>
                <a href="#" class="btn">Назад</a>
            </div>
        `;

    document.querySelector(".btn").addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(".full__post").innerHTML = "";
      document.querySelector(".posts").style.display = "grid";
    });
  }
  getPost();
});
