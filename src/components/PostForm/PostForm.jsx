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
import SubmitButton from '../SubmitButton/SubmitButton.jsx';
import { createPost, getById } from '../../services/fetch-utils.js';
import { useUser } from '../../context/UserContext.js';
import { useHistory } from 'react-router';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const history = useHistory();

  const { user } = useUser();
  console.log(user, 'USER');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        const postObj = {
          postedBy: user.userId,
          title: title,
          code: code,
          question: question,
        };
        const response = await createPost(postObj);
        console.log('response', response.body);

        history.push(`/postdetails/${response.body.postId}`);
      } else {
        history.push('/login');
      }
    } catch {}
  };
  return (
    <>
      <Container centerContent>
        <form onSubmit={handleSubmit}>
          <FormControl as="fieldset">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel htmlFor="code">Enter your code here:</FormLabel>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {/* <Center>
              <Image
                h="200px"
                src={
                  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
                }
                layout={'fill'}
              />
            </Center> */}
            <FormLabel htmlFor="looking">What is your question?</FormLabel>
            <Input
              id="looking"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
