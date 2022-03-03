import React, { useEffect, useState } from 'react';
import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';

import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import GithubBox from '../../components/GithubBox/GithubBox.jsx';
import { UserContext, useUser } from '../../context/UserContext.js';
import {
  getAllBoards,
  getAllPosts,
  getBoardsByUsername,
  getPostsByUsername,
} from '../../services/fetch-utils.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const [allPosts, setAllPosts] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const { user } = useUser();
  const { username } = useParams();

  useEffect(() => {
    const getPostsAndBoards = async () => {
      const postsByName = await getPostsByUsername(username);
      console.log(postsByName);
      setAllPosts(postsByName);

      const boardsByName = await getBoardsByUsername(username);
      console.log(boardsByName);
      setUserBoards(boardsByName);
    };
    getPostsAndBoards();
  }, []);

  return (
    <>
      <GithubBox usernamex={username} />
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
          {allPosts.map((post) => (
            <div key={post.postId}>
              <PostHomeBox key={post.postId} post={post} />
            </div>
          ))}
          {userBoards.map((board) => (
            <Link key={board.board_id} to={`/boarddetails/${board.board_id}`}>
              <div key={board.board_id}>
                <BoardHomeBox key={board.board_id} board={board} />
              </div>
            </Link>
          ))}
        </Flex>
      </Box>
    </>
  );
}
