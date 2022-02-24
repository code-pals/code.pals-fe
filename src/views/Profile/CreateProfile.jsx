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
// import Profile from './Profile';

export default function CreateProfile() {
  const [username, setUserName] = useState;
  const [pronouns, setPronouns] = useState;
  const [years, setYears] = useState;
  const [language, setLanguage] = useState;

  const history = useHistory();

  function formHandler(e) {
    e.preventDefault();
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
                    type="username"
                    placeholder="User Name"
                    value={username}
                  />
                  <br />
                  <Select placeholder="Select pronouns">
                    <option value="option1">He/Him/His</option>
                    <option value="option2">She/Her/Hers</option>
                    <option value="option3">They/Them/Their</option>
                    <option value="option3">Gender Neutral</option>
                    <option value="option3">Not Listed</option>
                  </Select>
                  <br />
                  <Select placeholder="Select Years of Experience">
                    <option value="option1">Less than 1</option>
                    <option value="option2">1 - 3</option>
                    <option value="option3">3 - 6</option>
                    <option value="option3">6 plus</option>
                  </Select>
                  <br />
                  <CheckboxGroup colorScheme="green">
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
                  </CheckboxGroup>
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
