import { useState } from 'react';

const tabsNames = [
  'Zarządzanie pracownikami',
  'Zarządzanie produktami',
  'Aktualne wypłaty',
  'Drukowanie',
  'Logi',
];

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs] = useState<string[]>(tabsNames);

  return <p>Sidebar</p>;
};

export default Sidebar;
