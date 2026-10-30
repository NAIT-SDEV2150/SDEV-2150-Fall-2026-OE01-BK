import { Outlet } from 'react-router';

import Header from './components/Header';
import PageLayout from './components/layout/PageLayout';

function App() {
  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <Outlet />
    </PageLayout>
  );
}

export default App;
