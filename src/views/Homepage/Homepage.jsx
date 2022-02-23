import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';

export default function Homepage() {
  return (
    <>
      <SearchBar />
      <CodeBox />;
    </>
  );
}
