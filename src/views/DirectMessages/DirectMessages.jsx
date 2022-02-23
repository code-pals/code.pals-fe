import React from 'react';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function DirectMessages() {
  return (
    <Flex
      w={'full'}
      h={'100vh'}
      backgroundImage={
        'https://images.unsplash.com/photo-1566125882500-87e10f726cdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
    ></Flex>
  );
}
