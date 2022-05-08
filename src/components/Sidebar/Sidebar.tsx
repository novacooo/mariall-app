import { Flex, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import SidebarTabs from 'components/SidebarTabs/SidebarTabs';

interface SidebarProps {
  width: number | string;
  showAlways?: boolean;
}

const Sidebar = ({ width, showAlways = false }: SidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const sidebarDisplay = useBreakpointValue({
    base: 'none',
    md: 'flex',
  });

  return (
    <Flex
      display={showAlways ? 'flex' : sidebarDisplay}
      direction="column"
      py={5}
      px={3}
      width={typeof width === 'number' ? `${width}px` : width}
      bgColor={bgColor}
      borderRightWidth={1}
      flexShrink={0}
    >
      <SidebarTabs />
    </Flex>
  );
};

export default Sidebar;
