const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Получить список постов
export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = await response.json();
  console.log(posts[0]);
  return posts;
};

// Получить список пользователей
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const users = await response.json();
  return users;
};

// Получить комментарии для конкретного поста
export const getComments = async (postId) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
  const comments = await response.json();
  return comments;
};

// Добавить новый пост
export const addPost = async (post) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const newPost = await response.json();
  return newPost;
};

// Удалить пост
export const deletePost = async (postId) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'DELETE',
  });
  return response.ok;
};

// Редактировать пост
export const editPost = async (postId, post) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const updatedPost = await response.json();
  return updatedPost;
};
