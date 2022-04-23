import {
  Avatar,
  Text,
  Pane,
  majorScale,
  minorScale,
  Popover,
  Menu,
  Position,
  Button,
  CaretDownIcon,
  SettingsIcon,
  LogOutIcon,
} from 'evergreen-ui';
import { ReactComponent as Logo } from 'assets/logo_mariall.svg';

const data = {
  appName: 'Zarządzanie produkcją',
  userName: 'Jacek Nowak',
};

const TopBar = () => (
  <Pane
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    padding={majorScale(2)}
    paddingLeft={majorScale(3)}
    borderBottom="default"
  >
    <Pane display="flex" alignItems="center" gap={majorScale(3)}>
      <Logo height={majorScale(4)} />
      <Pane width={1} height={majorScale(5)} background="gray300" />
      <Text color="muted">{data.appName}</Text>
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
      }
    >
      <Button
        height={majorScale(5)}
        iconAfter={CaretDownIcon}
        appearance="minimal"
      >
        <Pane display="flex" alignItems="center" gap={minorScale(2)}>
          <Text color="muted">{data.userName}</Text>
          <Avatar name={data.userName} size={majorScale(4)} />
        </Pane>
      </Button>
    </Popover>
  </Pane>
);

export default TopBar;
