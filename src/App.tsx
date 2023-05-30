import { ChakraBaseProvider } from '@chakra-ui/react';
import reactLogo from './assets/react.svg';

function App() {
  return (
    <ChakraBaseProvider>
      <div>
        <img src={reactLogo} alt="react logo" />
      </div>
    </ChakraBaseProvider>
  );
}

export default App;
