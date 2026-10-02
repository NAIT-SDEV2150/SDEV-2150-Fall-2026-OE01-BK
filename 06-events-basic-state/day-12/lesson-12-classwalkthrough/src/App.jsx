import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {
  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        <Results />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        <Details />
      </aside>
    </PageLayout>
    // <PageLayout
    //   header={<Header tagline="Find the right resources, right away" />}
    //   left={<Filters />}
    //   middle={<Results />}
    //   right={<Details />}
    // />

  );
}

export default App;
