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
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';


export default function Profile() {
  const [allPosts, setAllPosts] = useState([]);
  const [userBoards, setUserBoards] = useState([]);
  const { user } = useUser();
  const storedUser = JSON.parse(localStorage.getItem('storageUser'));
  console.log('storedUser',storedUser);

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
        (board) => board.created_by === storedUser.userId
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
      {allPosts.filter(post => post.postedBy === storedUser.userId).map((post) => (
        <div key={post.postId}>
          <PostHomeBox key={post.postId} post={post} />
        </div>
      ))}
      <CodeBox /> <CodeBox />
    </>
  );
}
