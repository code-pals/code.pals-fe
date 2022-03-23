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
import { useLocation } from 'react-router-dom';
export default function Results() {
  const { state } = useLocation();
  console.log('state', state);
  return (
    <>
      <SearchBar />
    </>
  );
}
