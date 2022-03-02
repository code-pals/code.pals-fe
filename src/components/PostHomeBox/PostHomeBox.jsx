import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  Code,
  useColorModeValue,
  Textarea,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Highlight from 'react-highlight';

export default function PostHomeBox({ post }) {
  const { user } = useUser();

  return (
    <Center py={6}>
      <Link to={`/postdetails/${post.postId}`}>
        <Box
          w="222px"
          h="450px"
          m="10px"
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Box
            maxH={'120px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
          >
            <Image
              src={
                'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80'
              }
              layout={'fill'}
            />
          </Box>
          <Stack>
            <Text
              color={'green.500'}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            ></Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'xl'}
              fontFamily={'body'}
            >
              {post.title}
            </Heading>
            <Box h="50" w="100">

              <Highlight>{post?.code?.slice(0, 20)}</Highlight>

            </Box>
            {/* <Box p="10px">
              <Text color={'gray.500'}>{post?.question?.slice(0, 10)} </Text>
            </Box> */}
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Link to={`/profile/${post.github}`}>
              <Avatar src={post?.avatar} alt={'Author'} />
              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}>{post.github}</Text>
                <Text color={'gray.500'}>{post?.created?.slice(0, 10)}</Text>
              </Stack>
            </Link>
          </Stack>
        </Box>
      </Link>
    </Center>
  );
}
