import {
  Input,
  Box,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Center,
} from '@chakra-ui/react';

export default function SearchBar() {
  return (
    <Center>
      <Box m="20px" width="50%">
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement
              children={<Icon name="search" color="gray.300" />}
            />
            <Input type="text" placeholder="Search" />
          </InputGroup>
        </Stack>
      </Box>
    </Center>
  );
}
