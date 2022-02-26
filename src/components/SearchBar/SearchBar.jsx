import {
  Input,
  Box,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
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
      const responseArr = await searchPostsAndComments(search);
      console.log(responseArr);
      setComments(responseArr.body[0]);
      setPosts(responseArr.body[2]);
      // history.push({ 
      //   pathname: '/results',
      //   state: comments })
  }

console.log(comments, posts);
  return (
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
            onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
          <Link to={{
  pathname: '/',
  state: { comments : comments,
           posts: posts,  
        }
}}/><button type='submit'>Submit</button><Link/>
          </form>
        </Stack>
      </Box>
      {posts.map((post) => {
       return ( <PostHomeBox post={post} />
      )})}

      {comments.map((comment) => {
        return ( <CommentBox comment={comment} />

     
      )})}
    </Center>
    
  );
}
