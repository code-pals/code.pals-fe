import React from 'react';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Button,
} from '@chakra-ui/react';
import { createBoard, editBoard } from '../../services/fetch-utils.js';
import { useUser } from '../../context/UserContext.js';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function BoardForm({ setShowForm }) {
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
        //if form is being edited
        if (params.id) {
          console.log('boardobjparam', boardObj);
          const response = await editBoard(params.id, boardObj);
          setShowForm((prev) => !prev);
        } else {
          const response = await createBoard(boardObj);
          history.push(`/boarddetails/${response.body.board_id}`);
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
              w="400px"
              required
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
            <FormLabel htmlFor="looking">What is your goal?</FormLabel>
            <Input
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <FormLabel htmlFor="amount">What is your group size?</FormLabel>
            <NumberInput max={20} min={1} value={groupSize}>
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
            <Button type="submit" mt="10px">
              Submit
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
