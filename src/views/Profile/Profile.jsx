import React, { useEffect, useState } from 'react';
import {
  Stack,
  Flex,
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

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const getPostsAndBoards = async () => {
      const response = await getAllPosts();
      console.log(response);
      const allPosts = response.body;
      const postsByUser = allPosts.filter((post) => {
        console.log(post);
        post.postedBy === user.userId;
      });
      console.log('POSTSBYUSER', postsByUser);
      setUserPosts(postsByUser);

      const resBoards = await getAllBoards();
      const allBoards = resBoards.body;
      const boardsByUser = allBoards.filter(
        (board) => board.created_by === user.userId
      );
      setUserBoards(boardsByUser);
    };
    getPostsAndBoards();
  }, []);

  return (
    <>
      <GithubBox />
      {userPosts.map((post) => (
        <div key={post.postId}>
          <PostHomeBox post={post} />
        </div>
      ))}
      <CodeBox /> <CodeBox />
    </>
  );
}
