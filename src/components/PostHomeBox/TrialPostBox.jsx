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
  import SyntaxHighlighter from 'react-syntax-highlighter';
  import { docco, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function TrialPostBox({ post }) {
  return (
    <Box w="300px"
    h="475px"
    m="10px"
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow={'2xl'}
    rounded={'md'}
    overflow={'hidden'}>

        <Box h='80px' border='1px'>
            {post.title}





        </Box>

         <Box h='235px' border='1px'  overflow={'hidden'}>
         {/* <Highlight>{post?.code?.slice(0, 50)}</Highlight> */}
         <SyntaxHighlighter language="javascript" showLineNumbers={true} style={a11yDark} wrapLines={true}>
            {post?.code?.slice(0,150)}
         </SyntaxHighlighter>



        </Box>

        <Box h='80px' border='1px'>

            {post.question}




        </Box>  
        <Box h='80px' border='1px'>
        <Avatar src={post?.avatar} alt={'Author'} />
        <Text>{post.github}</Text>
        </Box>
    </Box>
  )
}
