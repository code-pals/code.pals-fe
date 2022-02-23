import React from 'react';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Homepage() {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2478&q=80'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    ></Flex>
  );
}
