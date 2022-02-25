import { useState, useEffect } from 'react';
//import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import { getAllPosts, getAllBoards } from '../../services/fetch-utils.js';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getPostsAndBoards = async () => {
      const response = await getAllPosts();

      setPosts(response.body);
      const resBoards = await getAllBoards();
      setBoards(resBoards.body);
    };
    getPostsAndBoards();
  }, []);
  console.log('postsuseffect', posts);
  console.log('boards', boards);

  return (
    <>
      <SearchBar />
      {posts.map((post) => (
        <div key={post.postId}>
          <PostHomeBox post={post} key={post.postId} />
        </div>
      ))}
      {boards.map((board) => (
        <div key={board.board_id}>
          <BoardHomeBox board={board} key={board.board_id}/>
        </div>
      ))}
    </>
  );
}
