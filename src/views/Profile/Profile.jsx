import React from 'react';
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Container,
} from '@chakra-ui/react';

import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import GithubBox from '../../components/GithubBox/GithubBox.jsx';

export default function Profile() {
  return (
    <>
      <Container mt="10px" centerContent>
        <h1> Username </h1>
        <h3> Pronouns </h3>
        <h3> Years of Experience </h3>
        <h2> Tech Stack </h2>
      </Container>
      <CodeBox /> <CodeBox />
      <GithubBox />
    </>
  );
}
