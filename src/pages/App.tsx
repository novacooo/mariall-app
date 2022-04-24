import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'theme/theme';
import TabTemplate from 'templates/TabTemplate';

const App = () => (
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <TabTemplate name="Zarządzanie produktami">
        <p>TabTemplate</p>
      </TabTemplate>
    </ChakraProvider>
  </>
);

export default App;
