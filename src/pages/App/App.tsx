import { Helmet } from 'react-helmet';
import { majorScale, minorScale, Pane } from 'evergreen-ui';
import './App.css';
import TopBar from 'components/TopBar/TopBar';
import Sidebar from 'components/Sidebar/Sidebar';

const App = () => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <TopBar />
      <Pane display="flex" flexGrow={1}>
        <Sidebar />
        <Pane
          flexGrow={1}
          display="flex"
          padding={majorScale(4)}
          background="gray100"
        >
          <Pane
            flexGrow={1}
            borderRadius={minorScale(1)}
            background="white"
            elevation={2}
          />
        </Pane>
      </Pane>
    </>
  );
};

export default App;
