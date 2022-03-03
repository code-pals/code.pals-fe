import React from 'react';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  HStack,
  Button,
  FormErrorMessage,
  FormHelperText,
  Image,
  Input,
  Container,
  Center,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Text,
} from '@chakra-ui/react';
import { createBoard, editBoard } from '../../services/fetch-utils.js';
import { useUser } from '../../context/UserContext.js';
import { useHistory } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';

export default function BoardForm() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [goal, setGoal] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const history = useHistory();

  const { user } = useUser();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, summary, goal, groupSize);
    try {
      if (user) {
        const boardObj = {
          title: title,
          summary: summary,
          goal: goal,
          groupSize: groupSize,
        };
        const response = await createBoard(boardObj);
        console.log(response.body);
        history.push(`/boarddetails/${response.body.board_id}`);

        if (params) {
          const response = await editBoard(params.id, boardObj);
          console.log(response);
          window.location.reload();
        }
      } else {
        history.push('/login');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Container centerContent>
        <form onSubmit={handleSubmit}>
          <FormControl as="fieldset">
            <FormLabel htmlFor="title">Project Title</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel htmlFor="code">Summarize your project:</FormLabel>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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
            <FormLabel htmlFor="looking">What is your goal?</FormLabel>
            <Input
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <FormLabel htmlFor="amount">What is your group size?</FormLabel>
            <NumberInput
              max={20}
              min={1}
              value={groupSize}
              // onChange={(e) => setGroupSize(e.target.value)}
            >
              <NumberInputField name="amount" disabled />
              {console.log({ groupSize })}
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() =>
                    setGroupSize((prevState) => {
                      if (prevState < 20) return prevState + 1;
                      return 20;
                    })
                  }
                  disabled={groupSize === 1}
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setGroupSize((prevState) => {
                      if (prevState > 1) return prevState - 1;
                      return 1;
                    })
                  }
                  disabled={groupSize === 20}
                />
              </NumberInputStepper>
            </NumberInput>
            <Button type="submit">Submit</Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
