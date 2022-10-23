import { Box, Flex, Heading } from '@chakra-ui/react';
import Sidebar from 'components/Sidebar/Sidebar';
import TopBar from 'components/TopBar/TopBar';
import { ReactNode } from 'react';

interface PanelTemplateProps {
  name: string;
  children: ReactNode;
}

const PanelTemplate = ({ name, children }: PanelTemplateProps) => (
  <>
    <TopBar />
    <Box
      display={{
        base: 'block',
        md: 'flex',
      }}
      flexGrow={1}
    >
      <Sidebar width={250} />
      <Flex
        direction="column"
        flexGrow={1}
        gap={6}
        m={{
          base: 4,
          md: 8,
        }}
        mt={8}
      >
        <Heading as="h3" size="lg">
          {name}
        </Heading>
        {children}
      </Flex>
    </Box>
  </>
);

export default PanelTemplate;
