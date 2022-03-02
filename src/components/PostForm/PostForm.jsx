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
  Textarea,
  Input,
  Image,
  Container,
  Code,
  Center,
} from '@chakra-ui/react';
import SubmitButton from '../SubmitButton/SubmitButton.jsx';
import { createPost, editPost, getById } from '../../services/fetch-utils.js';
import { useUser } from '../../context/UserContext.js';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

export default function PostForm({setShowForm, setForceRender}) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const history = useHistory();
  const params = useParams();

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
          if(!params.id) {
            console.log('no params');
            const response = await createPost(postObj);
            console.log('response', response.body);
            history.push(`/postdetails/${response.body.postId}`);
          }
          else if(params.id){
            console.log('paramid');
            const editResponse = await editPost(params.id, postObj);
            console.log(editResponse)
            setShowForm(false);
            setForceRender(2);
            history.push('/profile');
        }
      } else {
        history.push('/login');
      }
    } catch {}
  };
console.log('params',params.id);
 
  return (
    <>
      <Container centerContent>
        <form onSubmit={handleSubmit}>
          <FormControl as="fieldset">
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel htmlFor="code">Enter your code here:</FormLabel>
            <Code>
              <Textarea
                h="300px"
                w="400px"
                id="code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Code>
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
