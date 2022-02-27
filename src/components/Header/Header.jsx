import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
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
    href={'#'}
  >
    {children}
  </Link>
);

export default function withAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, getUser, logIn, logOut } = useUser();
  const storedU = localStorage.getItem('storageUser');
  const storedUser = JSON.parse(storedU);
  console.log('headerStoredUser', storedUser);
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
              <Link href={'/'} underline="none">
                Home
              </Link>
              <Link href={'/create'} underline="none">
                Create
              </Link>
              <Link href={'/messages'} underline="none">
                Messages
              </Link>
              <Link href={'/login'} underline="none">
                Login
              </Link>
              <Link href={'/'} underline="none" onClick={logOut}>
                Logout
              </Link>
              <Link href={'/results'} underline="none">
                Search
              </Link>
              <Link href={'/aboutus'} underline="none">
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
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
              {storedUser ? <Avatar size={'sm'} src={storedUser.avatar} />
              : ''}
              </MenuButton>
              <MenuList>
                <Link href={'/profile'} underline="none">
                  {storedUser.github}'s<br/>
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
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
