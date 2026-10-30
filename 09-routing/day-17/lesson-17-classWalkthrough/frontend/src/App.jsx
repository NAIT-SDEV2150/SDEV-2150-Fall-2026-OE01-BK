import {Outlet} from 'react-router';
import PageLayout from "./components/layout/PageLayout";
import Header from './components/Header';

function App() {
  

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <Outlet/>
    </PageLayout>
  );
}

export default App;
