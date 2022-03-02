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
//get user from database by id
//and then get the avatar
export default function BoardHomeBox({ board }) {
  const { user } = useUser();
  return (
    <Center py={6}>
      <Box
        w="222px"
        h="420px"
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
              'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
            }
            layout={'fill'}
          />
        </Box>
        <Text color={'gray.500'}></Text>{' '}
        <Stack>
          <Text
            color={'green.500'}
            // textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
            mt="10px"
          >
            Group Size: {board.group_size}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {board.title}
          </Heading>
          <Text color={'gray.500'}>Board Summary: {board.summary} </Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Link to={`/profile/${board.github}`}>
            <Avatar src={board.avatar} alt={'Author'} />
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{board.github}</Text>
              <Text color={'gray.500'}>{board.created?.slice(0, 10)}</Text>
            </Stack>
          </Link>
        </Stack>
      </Box>
    </Center>
  );
}
