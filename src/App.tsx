import { ChakraBaseProvider, Stack, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </ChakraBaseProvider>
  );
}

export default App;
