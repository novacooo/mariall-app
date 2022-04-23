import {
  Heading,
  majorScale,
  minorScale,
  Pane,
  Strong,
  Tab,
  Tablist,
  Text,
} from 'evergreen-ui';
import { useState } from 'react';

const tabsNames = [
  'Zarządzanie pracownikami',
  'Zarządzanie produktami',
  'Aktualne wypłaty',
  'Drukowanie',
  'Logi',
];

interface TabsHeaderProps {
  children: string;
}

const TabsHeader = ({ children }: TabsHeaderProps) => (
  <Pane
    display="flex"
    alignItems="center"
    gap={majorScale(2)}
    marginX={majorScale(1)}
  >
    <Heading size={100}>{children}</Heading>
    <Pane width="100%" height={1} background="gray300" />
  </Pane>
);

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs] = useState<string[]>(tabsNames);

  return (
    <Pane
      display="flex"
      flexDirection="column"
      gap={majorScale(4)}
      borderRight="default"
      width="300px"
      paddingX={majorScale(2)}
      paddingY={majorScale(3)}
    >
      <Pane display="flex" flexDirection="column" gap={minorScale(3)}>
        <TabsHeader>Produkty</TabsHeader>
        <Tablist display="flex" flexDirection="column" gap={minorScale(2)}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              margin={0}
              height={majorScale(4)}
              direction="vertical"
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
      </Pane>
      <Pane display="flex" flexDirection="column" gap={minorScale(3)}>
        <TabsHeader>Pracownicy</TabsHeader>
        <Tablist display="flex" flexDirection="column" gap={minorScale(2)}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              margin={0}
              height={majorScale(4)}
              direction="vertical"
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
      </Pane>
    </Pane>
  );
};

export default Sidebar;
