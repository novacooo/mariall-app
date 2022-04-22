import { majorScale, Pane, Tab, Tablist } from 'evergreen-ui';
import { useState } from 'react';

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs] = useState(['Zakładka 1', 'Zakładka 2', 'Zakładka 3']);

  return (
    <Pane borderRight="default" width="300px" padding={majorScale(1)}>
      <Tablist display="flex" flexDirection="column" gap={majorScale(1)}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            width="100%"
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
    </Pane>
  );
};

export default Sidebar;
