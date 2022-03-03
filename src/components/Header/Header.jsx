import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';

const Links = ['Home', 'Create', 'Messages', 'Login', 'Search', 'About Us'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    to={'#'}
  >
    {children}
  </Link>
);

export default function withAction() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, getUser, logIn, logOut } = useUser();
  //const storedU = localStorage.getItem('storageUser');
  //const storedUser = JSON.parse(storedU);
  //console.log('headerStoredUser', storedUser);
  console.log('USER3', user);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Code.Pals</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link to={'/'} underline="none">
                Home
              </Link>
              <Link to={'/create'} underline="none">
                Create
              </Link>
              {!user.github ? (
                <Link to={'/login'} underline="none">
                  Login
                </Link>
              ) : (
                <Link to={'/'} underline="none" onClick={logOut}>
                  Logout
                </Link>
              )}
              <Link to={'/results'} underline="none">
                Search
              </Link>
              <Link to={'/chatrooms'} underline="none">
                Chat
              </Link>
              <Link to={'/aboutus'} underline="none">
                About Us
              </Link>
             
              {user.github}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {/* <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button> */}
            <Button onClick={toggleColorMode} mr="10px">
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                {user.avatar ? <Avatar size={'sm'} src={user.avatar} /> : ''}
              </MenuButton>
              <MenuList>
                <Link to={`/profile/${user.github}`} underline="none">
                  {user.github}'s
                  <br />
                  Profile
                </Link>
                {/* <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem> */}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <Link to={'/'} underline="none">
                Home
              </Link>
              <Link to={'/create'} underline="none">
                Create
              </Link>
              {!user.github ? (
                <Link to={'/login'} underline="none">
                  Login
                </Link>
              ) : (
                <Link to={'/'} underline="none" onClick={logOut}>
                  Logout
                </Link>
              )}
              <Link to={'/results'} underline="none">
                Search
              </Link>
              <Link to={'/chatrooms'} underline="none"  >
                Chat
              </Link>
              <Link to={'/aboutus'} underline="none">
                About Us
              </Link>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
