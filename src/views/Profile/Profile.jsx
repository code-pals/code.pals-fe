import React from 'react';
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
} from '@chakra-ui/react';

import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import GithubBox from '../../components/GithubBox/GithubBox.jsx';

export default function Profile() {
  return (
    <>
      <CodeBox /> <CodeBox />
      <GithubBox />
    </>
  );
}
