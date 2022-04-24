import { Flex, useColorModeValue } from '@chakra-ui/react';

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Flex direction="column" minHeight="100vh" bgColor={bgColor}>
      {children}
    </Flex>
  );
};

export default MainTemplate;
