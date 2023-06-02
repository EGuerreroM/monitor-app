import { Box, Image, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      maxW={1440}
      margin=" 0 auto">
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image src="images/logo.png" alt="logo" width={139} />
      </Stack>
      <Box width="100%">
        <Outlet />
      </Box>
    </Stack>
  );
};

export default Layout;
