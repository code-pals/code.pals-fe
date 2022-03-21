import {
  Box,
  Center,
  Heading,
  Image,
  Stack,
  useColorModeValue,
  Text,
  Avatar,
  Spacer,
} from '@chakra-ui/react';
// import Highlight from 'react-highlight';
import { Link } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import './NewBox.css';

function formatCodeHeight(code, codeHeight) {
  let displayCode;
  const splitCode = code.split('\n');

  if (splitCode.length < codeHeight) {
    const blankSpace = new Array(codeHeight - splitCode.length + 1).fill('');
    displayCode = splitCode.concat(blankSpace);
  } else {
    displayCode = splitCode.slice(0, codeHeight);
  }

  return displayCode.join('\n');
}

export default function NewPostBox({ post }) {
  return (
    // <Center>
    <Link to={`/postdetails/${post.postId}`}>
      <Box
        mr="20px"
        mb="10px"
        w="300px"
        h="475px"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Box maxH="250px" w="300px">
          <SyntaxHighlighter style={monokai}>
            {formatCodeHeight(post?.code, 8)}
          </SyntaxHighlighter>
        </Box>
        <Box h={'75px'} w={'100%'}>
          {/* <Center> */}
          <Heading
            ml="5px"
            mr="5px"
            mt="15px"
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'xl'}
            fontFamily={'body'}
          >
            {formatCodeHeight(post?.title, 5)}
          </Heading>
          {/* </Center> */}
        </Box>
        {/* <Box> */}
        {/* <Box> */}
        <Stack
          mt={6}
          direction={'column'}
          spacing={4}
          align={'left'}
          style={{ margin: 0, padding: 10 }}
        >
          {/* <Center> */}
          <Text pt="15px" color={'gray.500'}>
            {post?.question?.slice(0, 55)}
          </Text>
          {/* </Center> */}
          <Spacer />
          <Link to={`/profile/${post.github}`}>
            <Avatar src={post?.avatar} alt={'Author'} />
            <Text fontWeight={600}>{post.github}</Text>
            <Text color={'gray.500'}>{post?.created?.slice(0, 10)}</Text>
          </Link>
        </Stack>
        {/* </Box> */}
      </Box>
      {/* </Box> */}
    </Link>
    // </Center>
  );
}
