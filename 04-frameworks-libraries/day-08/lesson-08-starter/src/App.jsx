import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import './App.css';

function App() {
  return (
    <>
      <Header tagline="Find the right resources, right away" />
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
        <div className="w-full">
          <Filters />
        </div>
        <div className="w-full">
          <Results />
        </div>
        <div className="w-full">
          <Details />
        </div>
      </div>
    </>
  );
}

export default App;
