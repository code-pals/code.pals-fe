import request from 'superagent';

const url = 'http://localhost:7890/api/v1';

export async function getAllPosts() {
  const response = await request.get(`${url}/posts`);
  return response;
}
export async function getAllBoards() {
  const response = await request
  .get(`${url}/boards`);

  return response;
}

export async function createPost(post) {
  const response = await request
    .post(`${url}/posts`)
    .send(post)
    .withCredentials();
  return response;
}
export async function createBoard(board) {
  const response = await request
  .post(`${url}/boards`)
  .send(board)
  .withCredentials();

  return response;
}
export async function getUserById(id) {
  const response = await request
  .get(`${url}/users/id`);

  return response;
}