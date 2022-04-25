import { Flex, useColorModeValue } from '@chakra-ui/react';
import SidebarItem from 'components/SidebarItem/SidebarItem';
import SidebarMenu from 'components/SidebarMenu/SidebarMenu';
import { SidebarGroup } from 'constants/sidebarGroups';
import { data } from 'data';
import { useLocation } from 'react-router-dom';
import {
  GROUP_EMPLOYEES,
  GROUP_OTHER,
  GROUP_PRODUCTS,
  GROUP_SALARIES,
} from 'theme/translations';

const groups: SidebarGroup[] = [
  SidebarGroup.PRODUCTS,
  SidebarGroup.SALARIES,
  SidebarGroup.EMPLOYEES,
  SidebarGroup.OTHER,
];

const { panelTabs } = data;

const getGroupName = (group: SidebarGroup) => {
  if (group === SidebarGroup.PRODUCTS) return GROUP_PRODUCTS;
  if (group === SidebarGroup.SALARIES) return GROUP_SALARIES;
  if (group === SidebarGroup.EMPLOYEES) return GROUP_EMPLOYEES;
  return GROUP_OTHER;
};

const Sidebar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const location = useLocation();

  return (
    <Flex
      direction="column"
      py={5}
      px={3}
      width="250px"
      bgColor={bgColor}
      borderRightWidth={1}
    >
      <Flex direction="column" gap={5}>
        {groups.map((group) => {
          const groupName = getGroupName(group);
          return (
            <SidebarMenu key={groupName} name={groupName}>
              {panelTabs.map((tab) => (
                <>
                  {tab.group === group && (
                    <SidebarItem
                      key={tab.id}
                      active={tab.route === location.pathname}
                      link={tab.route}
                    >
                      {tab.name}
                    </SidebarItem>
                  )}
                </>
              ))}
            </SidebarMenu>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
