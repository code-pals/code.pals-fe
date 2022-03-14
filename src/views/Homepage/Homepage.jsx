import { useState, useEffect } from 'react';
import { getAllPosts, getAllBoards } from '../../services/fetch-utils.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  spacer,
  Center,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import NewPostBox from '../../components/NewBox/NewPostBox.jsx';

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const [boards, setBoards] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    const getPostsAndBoards = async () => {
      const response = await getAllPosts();
      console.log('RESPONSE.BODY', response.body);
      setPosts(response.body);
      const resBoards = await getAllBoards();
      setBoards(resBoards.body);
    };
    if (tab === 'all') {
      getPostsAndBoards();
    } else if (tab === 'posts') {
      getAllPosts().then((response) => setPosts(response.body));
      setBoards([]);
    } else if (tab === 'boards') {
      getAllBoards().then((response) => setBoards(response.body));
      setPosts([]);
    }
    console.log(tab);
  }, [tab]);

  const handleClick = (tabName) => {
    setTab(tabName);
  };

  return (
    <>
      <Center mt="10px">
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab onClick={() => handleClick('all')}>ALL</Tab>
              <Tab onClick={() => handleClick('posts')}>POSTS</Tab>
              <Tab onClick={() => handleClick('boards')}>PROJECTS</Tab>
            </TabList>
          </Tabs>
        </Flex>
      </Center>
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
                  {/* <PostHomeBox post={post} key={post.postId} /> */}
                  <NewPostBox post={post} key={post.postId} />
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
