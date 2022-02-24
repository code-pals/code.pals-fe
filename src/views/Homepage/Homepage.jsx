import { useState, useEffect } from 'react';
//import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import { getAllPosts } from '../../services/fetch-utils.js';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';

export default function Homepage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await getAllPosts();
      setPosts(response.body);
    };
    getPosts();
  }, []);
  console.log(posts);

  return (
    <>
      <SearchBar />
      {posts.map((post) => (
        <div key={post.postId}>
          <PostHomeBox post={post} key={post.postId} />
        </div>
      ))}
    </>
  );
}
