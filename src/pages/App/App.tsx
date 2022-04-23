import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'theme/theme';
import TopBar from 'components/TopBar/TopBar';
import Sidebar from 'components/Sidebar/Sidebar';

const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <TopBar />
      <Sidebar />
    </ChakraProvider>
  </>
);

export default App;
