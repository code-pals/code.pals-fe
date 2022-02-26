import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  CheckboxGroup,
  Checkbox,
  Center,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { postUserData } from '../../services/fetch-utils';
// import Profile from './Profile';

export default function CreateProfile() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [experience, setExperience] = useState('');
  const [techStack, setTechStack] = useState([]);
  const { user } = useUser();

  async function formHandler(e) {
    e.preventDefault();
    const userObj = {
      username: username,
      pronouns: pronouns,
      experience: experience,
    };
    const id = user.userId;
    console.log(id);
    const response = await postUserData(id, userObj);
    console.log(response);
    alert('backend stuff goes here');
    history.replace('/profile');
  }

  return (
    <>
      <Flex minH={'100vh'} align={'center'} justify={'center'}>
        <Center>
          <Container>
            <form onSubmit={formHandler}>
              <FormControl>
                <Container mt="10px" centerContent>
                  <Input
                    id="username"
                    placeholder="User Name"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  <br />
                  <Select
                    placeholder="Select pronouns"
                    onChange={(e) => setPronouns(e.target.value)}
                    value={pronouns}
                  >
                    <option value="option1">He/Him/His</option>
                    <option value="option2">She/Her/Hers</option>
                    <option value="option3">They/Them/Their</option>
                    <option value="option3">Gender Neutral</option>
                    <option value="option3">Not Listed</option>
                  </Select>
                  <br />
                  <Select
                    placeholder="Select Years of Experience"
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                  >
                    <option value="option1">Less than 1</option>
                    <option value="option2">1 - 3</option>
                    <option value="option3">3 - 6</option>
                    <option value="option3">6 plus</option>
                  </Select>
                  <br />
                  {/* <CheckboxGroup colorScheme="green">
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Checkbox value="JavaScript">JavaScript</Checkbox>
                      <Checkbox value="C++">C++</Checkbox>
                      <Checkbox value="Python">Python</Checkbox>
                      <Checkbox value="C#">C#</Checkbox>
                      <Checkbox value="React">React</Checkbox>
                    </Stack>
                    <br />
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                      <Checkbox value="Java">Java</Checkbox>
                      <Checkbox value="Ruby">Ruby</Checkbox>
                      <Checkbox value="SQL">SQL</Checkbox>
                      <Checkbox value="HTML">HTML</Checkbox>
                      <Checkbox value="CSS">CSS</Checkbox>
                      <Checkbox value=".net">.Net</Checkbox>
                    </Stack>
                  </CheckboxGroup>*/}

                  <br />
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                  >
                    Create account
                  </Button>
                </Container>
              </FormControl>
            </form>
          </Container>
        </Center>
      </Flex>
    </>
  );
}
