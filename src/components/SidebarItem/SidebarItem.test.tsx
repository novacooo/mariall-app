import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SidebarItem from './SidebarItem';

const elementName = 'Element name';

const MockSidebarItem = ({ active }: { active?: boolean }) => (
  <BrowserRouter>
    <SidebarItem active={active}>{elementName}</SidebarItem>
  </BrowserRouter>
);

describe('SidebarItem', () => {
  it('renders visible component', () => {
    render(<MockSidebarItem />);
    const sidebarItemElement = screen.getByTestId('sidebar-item');
    expect(sidebarItemElement).toBeVisible();
  });

  it('shows name passed as children prop', () => {
    render(<MockSidebarItem />);
    const sidebarItemElement = screen.getByTestId('sidebar-item');
    expect(sidebarItemElement).toHaveTextContent(elementName);
  });
});
