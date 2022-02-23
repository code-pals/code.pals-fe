import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  FormErrorMessage,
  FormHelperText,
  Input,
  Image,
  Container,
  Center,
} from '@chakra-ui/react';
import SubmitButton from '../../components/SubmitButton/SubmitButton.jsx';

export default function CreateForm() {
  return (
    <>
      <Container centerContent>
        <FormControl as="fieldset">
          <FormLabel as="legend">Create A Post or Board</FormLabel>
          <RadioGroup defaultValue="Itachi">
            <HStack spacing="24px">
              <Radio value="Post">Post</Radio>
              <Radio value="Board">Board</Radio>
            </HStack>
          </RadioGroup>
          <FormHelperText>Select</FormHelperText>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input id="title" type="title" />
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input id="username" type="username" />
          <FormLabel htmlFor="code">Code Snippet:</FormLabel>
          <Center>
            <Image
              h="200px"
              src={
                'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80'
              }
              layout={'fill'}
            />
          </Center>
          <FormLabel htmlFor="looking">What are you looking for?</FormLabel>
          <Input id="looking" type="looking" />
        </FormControl>
        <SubmitButton />
      </Container>
    </>
  );
}
