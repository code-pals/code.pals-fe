import BoardForm from '../../components/BoardForm/BoardForm.jsx';
import PostForm from '../../components/PostForm/PostForm.jsx';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  Container,
} from '@chakra-ui/react';

export default function Post() {
  const [radioValue, setRadioValue] = useState('Post');

  const onChangeValue = (e) => {
    setRadioValue(e.target.value);
  };
  return (
    <>
      <Container centerContent>
        <form onChange={onChangeValue}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Create A Post or Board</FormLabel>
            <RadioGroup defaultValue="Post">
              <HStack spacing="24px">
                <Radio value="Post">Post</Radio>
                <Radio value="Board">Board</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
        </form>
      </Container>

      {radioValue === 'Post' ? <PostForm /> : <BoardForm />}
    </>
  );
}
