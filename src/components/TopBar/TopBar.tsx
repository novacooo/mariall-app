import {
  Avatar,
  Text,
  Pane,
  majorScale,
  minorScale,
  Heading,
  Popover,
  Menu,
  Position,
  Button,
  CaretDownIcon,
  SettingsIcon,
  LogOutIcon,
} from 'evergreen-ui';

const data = {
  appName: 'mariall-app',
  userName: 'Jacek Nowak',
};

const TopBar = () => (
  <Pane
    display="flex"
    justifyContent="space-between"
    padding={majorScale(2)}
    borderBottom="default">
    <Pane
      display="flex"
      alignItems="center"
      gap={minorScale(2)}
      marginLeft={majorScale(1)}>
      <Avatar name={data.appName} size={majorScale(4)} />
      <Heading size={500}>{data.appName}</Heading>
    </Pane>
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item icon={SettingsIcon}>Ustawienia</Menu.Item>
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item intent="danger" icon={LogOutIcon}>
              Wyloguj się
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }>
      <Button
        height={majorScale(5)}
        iconAfter={CaretDownIcon}
        appearance="minimal">
        <Pane display="flex" alignItems="center" gap={minorScale(2)}>
          <Text color="muted">{data.userName}</Text>
          <Avatar name={data.userName} size={majorScale(4)} />
        </Pane>
      </Button>
    </Popover>
  </Pane>
);

export default TopBar;
