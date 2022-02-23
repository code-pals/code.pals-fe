import React from 'react';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import SearchBar from '../../components/SearchBar/SearchBar.jsx';

export default function DirectMessages() {
  return (
    <>
      <SearchBar />;
    </>
  );
}
