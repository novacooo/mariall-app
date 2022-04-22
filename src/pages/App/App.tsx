import { Helmet } from 'react-helmet';
import { Pane } from 'evergreen-ui';
import TopBar from 'components/TopBar/TopBar';
import './App.css';

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
      <Pane margin={0}>
        <TopBar />
      </Pane>
    </>
  );
};

export default App;
