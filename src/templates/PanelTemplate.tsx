import { Divider, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import Sidebar from 'components/Sidebar/Sidebar';
import TopBar from 'components/TopBar/TopBar';
import MainTemplate from './MainTemplate';

interface PanelTemplateProps {
  name: string;
  children: React.ReactNode;
}

const PanelTemplate = ({ name, children }: PanelTemplateProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <MainTemplate>
      <TopBar />
      <Flex flexGrow={1}>
        <Sidebar />
        <Flex
          direction="column"
          flexGrow={1}
          gap={5}
          bgColor={bgColor}
          m={8}
          py={5}
          px={6}
          borderWidth={1}
          rounded="md"
        >
          <Flex direction="column" gap={3}>
            <Heading as="h4" size="md" fontWeight="normal">
              {name}
            </Heading>
            <Divider />
          </Flex>
          {children}
        </Flex>
      </Flex>
    </MainTemplate>
  );
};

export default PanelTemplate;
