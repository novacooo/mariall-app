import { Button, Container, AppBar, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid red;
`;

const TopBar = () => (
  <StyledAppBar position="static" elevation={0}>
    <Container>
      <Button variant="outlined">Toggle theme</Button>
    </Container>
  </StyledAppBar>
);
export default TopBar;
