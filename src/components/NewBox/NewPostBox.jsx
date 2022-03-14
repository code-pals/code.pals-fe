import {
  Box,
  Center,
  Heading,
  Image,
  Stack,
  useColorModeValue,
  Text,
  Avatar,
} from '@chakra-ui/react';
import Highlight from 'react-highlight';
import { Link } from 'react-router-dom';
import './NewBox.css';

export default function NewPostBox({ post }) {
  return (
    <Center>
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
          <Box h="250px" w="300px">
            <Highlight>{post?.code?.slice(0, 50)}</Highlight>
          </Box>
          <Box h={'75px'} w={'100%'}>
            <Center>
              <Heading
                ml="5px"
                mr="5px"
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'xl'}
                fontFamily={'body'}
              >
                {post?.title?.slice(0, 55)}
              </Heading>
            </Center>
          </Box>
          <Box>
            <Center>
              <Text pt="15px" color={'gray.500'}>
                {post?.question?.slice(0, 55)}
              </Text>
            </Center>
            <Box>
              <Stack
                mt={6}
                direction={'row'}
                spacing={4}
                align={'center'}
                style={{ margin: 0, padding: 10 }}
              >
                <Link to={`/profile/${post.github}`}>
                  <Avatar src={post?.avatar} alt={'Author'} />
                  <Text fontWeight={600}>{post.github}</Text>
                  <Text color={'gray.500'}>{post?.created?.slice(0, 10)}</Text>
                </Link>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Link>
    </Center>
  );
}
