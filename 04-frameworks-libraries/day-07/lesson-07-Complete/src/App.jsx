import Header from "./components/Header";
import Results from "./components/Results";
import Details from "./components/Details";
import Filters from "./components/Filters";

function App() {


  return (
    <>
      <Header tagline = "Find the right resources, right away"/>

      <div className=" flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
        <div>
          <Filters className="w-full" />
        </div>
        <div>
          <Results className="w-full" />
        </div>
        <div>
          <Details className="w-full"/>
        </div>
      </div>





    </>
  );
}

export default App;
