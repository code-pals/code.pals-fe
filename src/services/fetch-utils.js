import request from 'superagent';

const url = 'http://localhost:7890/api/v1';

export async function getAllPosts() {
  const response = await request.get(`${url}/posts`);
  return response;
}

export async function createPost(post) {
  const response = await request
    .post(`${url}/posts`)
    .send(post)
    .withCredentials();
  return response;
}
