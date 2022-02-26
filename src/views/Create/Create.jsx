import BoardForm from '../../components/BoardForm/BoardForm.jsx';
import PostForm from '../../components/PostForm/PostForm.jsx';
import { useUser } from '../../context/UserContext.js';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Button,
  FormErrorMessage,
  FormHelperText,
  Input,
  Image,
  Container,
  Center,
} from '@chakra-ui/react';
import { createPost, getById } from '../../services/fetch-utils.js';
import { useHistory } from 'react-router';
export default function Post() {
  const { user } = useUser();
  const [radioValue, setRadioValue] = useState('Post');
  console.log(radioValue);

  const onChangeValue = (e) => {
    setRadioValue(e.target.value)
    console.log(e.target.value);
  }
  return (
    <>
    <Container centerContent>
    <form onChange={onChangeValue}>
    <FormControl as="fieldset">
            <FormLabel as="legend">Create A Post or Board</FormLabel>
            <RadioGroup 
            defaultValue="Post"
            >
              <HStack spacing="24px">
                <Radio value="Post">Post</Radio>
                <Radio value="Board">Board</Radio>
              </HStack>
            </RadioGroup>
            </FormControl>
        </form>
      </Container>

      {radioValue === 'Post' ? (
      <PostForm />
      ) : (
      <BoardForm />
      )}
    </>
  );
}
