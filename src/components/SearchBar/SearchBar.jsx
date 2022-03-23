import {
  Input,
  Box,
  Stack,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
  Button,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { searchPostsAndComments } from '../../services/fetch-utils';
import CommentBox from '../CommentBox/CommentBox';
import PostHomeBox from '../PostHomeBox/PostHomeBox';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search === '') {
      alert('please enter a phrase or keyword');
    } else {
      const responseArr = await searchPostsAndComments(search);
      setComments(responseArr.body[0]);
      setPosts(responseArr.body[2]);
    }
  };

  return (
    <>
      <Center>
        <Box m="20px" width="50%">
          <Stack spacing={4}>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <InputLeftElement
                  children={<Icon name="search" color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <Button type="submit" mt="10px">
                Submit
              </Button>
            </form>
          </Stack>
        </Box>
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
          {posts.map((post) => (
            <div key={post.postId}>
              <PostHomeBox post={post} key={post.postId} />
            </div>
          ))}
        </Flex>
        <Center>
          <Box>
            <br />
            {comments.map((comment) => (
              <Box w="100%" key={comment.commentId}>
                <br />
                <CommentBox comment={comment} key={comment.commentId} />
              </Box>
            ))}
          </Box>
        </Center>
      </Box>
    </>
  );
}
