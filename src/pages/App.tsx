import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'theme/theme';
import MainTemplate from 'templates/MainTemplate';
import TopBar from 'components/TopBar/TopBar';
import Sidebar from 'components/Sidebar/Sidebar';

const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <MainTemplate>
        <TopBar />
        <Sidebar />
      </MainTemplate>
    </ChakraProvider>
  </>
);

export default App;
