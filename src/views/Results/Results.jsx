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
import CodeBox from '../../components/CodeBox/CodeBox.jsx';

export default function Results() {
  return (
    <>
      <SearchBar />;
      <CodeBox />
    </>
  );
}
