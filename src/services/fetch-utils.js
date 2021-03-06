import request from 'superagent';

//const url = 'http://localhost:7890/api/v1';
const url = 'https://codepalz.herokuapp.com/api/v1';

export async function getAllPosts() {
  const response = await request.get(`${url}/posts`);
  return response;
}
export async function createBoard(board) {
  const response = await request
    .post(`${url}/boards`)
    .send(board)
    .withCredentials();

  return response;
}
export async function getAllBoards() {
  const response = await request.get(`${url}/boards`);

  return response;
}

export async function getBoardById(id) {
  const response = await request.get(`${url}/boards/${id}`);
  return response;
}

export async function getCommentsByBoard(id) {
  const response = await request.get(`${url}/boards/${id}`);

  return response;
}

export async function searchBoardsAndComments(keyword) {
  const response = await request.get(`${url}/comments?keyword=${keyword}`);

  return response;
}

export async function createPost(post) {
  const response = await request
    .post(`${url}/posts`)
    .send(post)
    .withCredentials();
  return response;
}
export async function getUserById(id) {
  const response = await request.get(`${url}/users/${id}`);

  return response;
}
export async function postUserData(id, user) {
  const response = await request
    .patch(`${url}/users/profile/${id}`)
    .send(user)
    .withCredentials();

  return response;
}

export async function getPostById(id) {
  const response = await request.get(`${url}/posts/${id}`);

  return response;
}

export async function getCommentsByPost(id) {
  const response = await request.get(`${url}/comments/${id}`);

  return response;
}

export async function createComment(comment) {
  const response = await request
    .post(`${url}/comments`)
    .send(comment)
    .withCredentials();

  return response;
}
export async function searchPostsAndComments(keyword) {
  const response = await request.get(`${url}/comments?keyword=${keyword}`);

  return response;
}
export async function getAllUsers() {
  const response = await request.get(`${url}/users`);

  return response;
}
export async function deletePost(id) {
  const response = await request.delete(`${url}/posts/${id}`).withCredentials();

  return response;
}
export async function editPost(id, postObj) {
  const response = await request
    .patch(`${url}/posts/${id}`)
    .send(postObj)
    .withCredentials();

  return response;
}
export async function deleteBoard(id) {
  const response = await request
    .delete(`${url}/boards/${id}`)
    .withCredentials();

  return response;
}
export async function editBoard(id, boardObj) {
  const response = await request
    .patch(`${url}/boards/${id}`)
    .send(boardObj)
    .withCredentials();

  return response;
}
export async function aggregateComments(postId) {
  const response = await request.get(`${url}/comments/parent/${postId}`);

  return response.body;
}
export async function getPostsByUsername(username) {
  const response = await request.get(`${url}/posts/username/${username}`);

  return response.body;
}
export async function getBoardsByUsername(username) {
  const response = await request.get(`${url}/boards/username/${username}`);

  return response.body;
}
export async function getUserByName(username) {
  const response = await request.get(`${url}/users/username/${username}`);

  return response.body;
}
export async function favoriteComment(commentId, postObj) {
  console.log('postObj', postObj);
  const response = await request
  .patch(`${url}/posts/favorite/${commentId}`)
  .send(postObj);

  console.log('fav response', response);
  return response;
}
export async function getCommentById(commentId) {
  const response = await request
  .get(`${url}/comments/comment/${commentId}`);

  return response;
}
