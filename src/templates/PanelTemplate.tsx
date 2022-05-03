import { Flex, Heading } from '@chakra-ui/react';
import Sidebar from 'components/Sidebar/Sidebar';
import TopBar from 'components/TopBar/TopBar';

interface PanelTemplateProps {
  name: string;
  children: React.ReactNode;
}

const PanelTemplate = ({ name, children }: PanelTemplateProps) => (
  <>
    <TopBar />
    <Flex flexGrow={1}>
      <Sidebar width={250} />
      <Flex
        direction="column"
        flexGrow={1}
        gap={5}
        m={{
          base: 4,
          md: 8,
        }}
        mt={8}
      >
        <Heading as="h4" size="lg">
          {name}
        </Heading>
        {children}
      </Flex>
    </Flex>
  </>
);

export default PanelTemplate;
