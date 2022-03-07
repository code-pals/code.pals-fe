import { Box, Center, useColorModeValue } from '@chakra-ui/react';
import Highlight from 'react-highlight';
export default function CodeBox({ post }) {
  return (
    <Center py={6}>
      <Box
        maxW={'90%'}
        maxH={'100%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <Box bg={'gray.100'} pos={'relative'}>
          <Highlight>{post?.code}</Highlight>
        </Box>
      </Box>
    </Center>
  );
}
