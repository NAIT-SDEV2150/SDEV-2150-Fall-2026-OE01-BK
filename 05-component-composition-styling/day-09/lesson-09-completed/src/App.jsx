import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

export default function App() {
  return (
    <PageLayout
      header={<Header tagline="Find the right resources, right away" />}
      left={<Filters />}
      middle={<Results />}
      right={<Details />}
    />
  );
}