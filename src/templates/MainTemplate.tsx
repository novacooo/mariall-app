import { Flex, useColorModeValue } from '@chakra-ui/react';
import ColorContextProvider from 'contexts/ColorContext';
import { ReactNode } from 'react';

interface MainTemplateProps {
  children: ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <ColorContextProvider>
      <Flex direction="column" minHeight="100%" bgColor={bgColor}>
        {children}
      </Flex>
    </ColorContextProvider>
  );
};

export default MainTemplate;
