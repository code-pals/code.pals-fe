import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
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

import { createPost, editPost, getById } from '../../services/fetch-utils.js';
import { useUser } from '../../context/UserContext.js';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';

export default function PostForm({ setShowForm, setForceRender }) {
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
        //regular post form
        if (!params.id) {
          const response = await createPost(postObj);
          history.push(`/postdetails/${response.body.postId}`);
        } //if editing post form
        else if (params.id) {
          const editResponse = await editPost(params.id, postObj);
          console.log(editResponse);
          
          setShowForm((prev) => !prev);
          //window.location.reload();
        }
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
            <FormLabel htmlFor="looking">What is your question?</FormLabel>
            <Input
              id="looking"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button type="submit" mt="10px">
              Submit
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
