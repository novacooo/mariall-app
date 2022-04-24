import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';

const tabsNames = [
  'Zarządzanie pracownikami',
  'Zarządzanie produktami',
  'Aktualne wypłaty',
  'Drukowanie',
  'Logi',
];

const Sidebar = () => {
  const bgColor = useColorModeValue('white', 'gray.900');

  return (
    <Flex direction="column" p={5} width="250px" flexGrow={1} bgColor={bgColor}>
      <Heading>Menu</Heading>
      {tabsNames.map((tab) => (
        <p>{tab}</p>
      ))}
    </Flex>
  );
};

export default Sidebar;
