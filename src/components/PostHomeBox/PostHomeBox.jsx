import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
export default function PostHomeBox({ post }) {
  const { user } = useUser();

  return (
    <Center py={6}>
      <Link to={`/postdetails/${post.postId}`}>
        <Box
          maxW={'222px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}
        >
          <Box
            h={'105px'}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
          >
            <Image
              src={
                'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
            >
              Blog
            </Text>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {post.title}
            </Heading>
            <Text color={'gray.500'}>Post Question: {post.question} </Text>
          </Stack>
          <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Avatar src={post.avatar} alt={'Author'} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
             {/* <Link to={`/profile`}> */}
                <Text fontWeight={600}>{post.username}</Text>

              <Text color={'gray.500'}>
                {post.created.slice(0, 10)} · Comments
              </Text>
            </Stack>
          </Stack>
        </Box></Link>
      
    </Center>
  );
}
