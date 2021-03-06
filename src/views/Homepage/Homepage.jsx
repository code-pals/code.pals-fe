import { useState, useEffect } from 'react';
import { getAllPosts, getAllBoards } from '../../services/fetch-utils.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { Link } from 'react-router-dom';
import { Flex, Box, spacer } from '@chakra-ui/react';
import TrialPostBox from '../../components/PostHomeBox/TrialPostBox.jsx';

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [boards, setBoards] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const getPostsAndBoards = async () => {
      const response = await getAllPosts();

      setPosts(response.body);
      const resBoards = await getAllBoards();
      setBoards(resBoards.body);
    };
    getPostsAndBoards();
  }, []);

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
          {posts
            .sort(
              (d1, d2) =>
                new Date(d2.created).getTime() - new Date(d1.created).getTime()
            )
            .map((post) => {
              return (
                <div key={post.postId}>
                  <PostHomeBox post={post} key={post.postId} />
                </div>
              );
            })}

          {boards
            .sort(
              (d1, d2) =>
                new Date(d2.created).getTime() - new Date(d1.created).getTime()
            )
            .map((board) => (
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
