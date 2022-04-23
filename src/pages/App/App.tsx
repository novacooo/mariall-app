import { Helmet } from 'react-helmet';
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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <TopBar />
      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default App;
