import { Button, Image, Link, Stack } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ROUTES } from '../../constants';

const Home = () => {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green.500',
        height: '100vh',
      }}>
      <Image src="images/logo.png" alt="logo" width={650} />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap="60px"
        width="100%">
        <Link
          as={ReactRouterLink}
          to={ROUTES.HOME}
          _disabled={{ cursor: 'not-allowed' }}
          p="25px 72px"
          backgroundColor="gray.50"
          borderRadius="4px">
          LOGIN
        </Link>
        <Link
          as={ReactRouterLink}
          p="25px 72px"
          to={ROUTES.PLANTS.LIST}
          backgroundColor="gray.50"
          borderRadius="4px">
          EXPLORE
        </Link>
      </Stack>
    </Stack>
  );
};

export default Home;
