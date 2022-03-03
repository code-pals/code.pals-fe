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
import { getAllBoards, getAllPosts } from '../../services/fetch-utils.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { Link } from 'react-router-dom';
export default function Profile() {
  const [allPosts, setAllPosts] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const { user } = useUser();
  const storedUser = JSON.parse(localStorage.getItem('storageUser'));
  console.log('storedUser', storedUser);

  useEffect(() => {
    const getPostsAndBoards = async () => {
      const response = await getAllPosts();
      console.log(response);
      setAllPosts(response.body);
      const postsByUser = allPosts.filter((post) => {
        Number(post.postedBy) === Number(storedUser.userId);
      });
      console.log('POSTSBYUSER', postsByUser);

      const resBoards = await getAllBoards();
      const allBoards = resBoards.body;
      const boardsByUser = allBoards.filter(
        (board) => board.created_by === user.userId
      );
      setUserBoards(boardsByUser);
    };
    getPostsAndBoards();
  }, []);

  //const newPosts = allPosts.filter(post => post.postedBy === storedUser.userId);
  //console.log('newposts', newPosts);
  return (
    <>
      <GithubBox />
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
          {allPosts
            .filter((post) => post.postedBy === user.userId)
            .map((post) => (
              <div key={post.postId}>
                <PostHomeBox key={post.postId} post={post} />
              </div>
            ))}
          {userBoards
            .filter((board) => board.created_by === user.userId)
            .map((board) => (
              <Link to={`/boarddetails/${board.board_id}`}>
                <div key={board.board_id}>
                  <BoardHomeBox key={board.board_id} board={board} />
                </div>
              </Link>
            ))}
          {/*         
      <CodeBox /> <CodeBox /> */}
        </Flex>
      </Box>
    </>
  );
}
