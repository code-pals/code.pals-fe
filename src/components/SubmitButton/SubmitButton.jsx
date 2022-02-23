import { Button } from '@chakra-ui/react';

export default function SubmitButton() {
  return (
    <Button
      bg={'blue.400'}
      color={'white'}
      _hover={{ bg: 'blue.500' }}
      // onClick={submit}
    >
      Submit
    </Button>
  );
}
