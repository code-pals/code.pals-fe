import { useState, useEffect } from 'react';
//import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import { getAllPosts, getAllBoards } from '../../services/fetch-utils.js';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { Link } from 'react-router-dom';
import { Flex, Box, spacer } from '@chakra-ui/react';

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
      <Box>
        <Flex
          direction="row"
          wrap="wrap"
          p="40"
          margin="10px"
          padding="10px"
          align={'center'}
          justify={'center'}
        >
          {posts.map((post) => (
            <div key={post.postId}>
              <PostHomeBox post={post} key={post.postId} />
            </div>
          ))}

          {boards.map((board) => (
            <Link key={board.board_id} to={`/boarddetails/${board.board_id}`}>
              <div key={board.board_id}>
                <BoardHomeBox board={board} key={board.board_id} />
              </div>
            </Link>
          ))}
        </Flex>
      </Box>
    </>
  );
}
