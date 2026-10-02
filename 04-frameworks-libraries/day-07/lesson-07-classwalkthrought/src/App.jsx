import './App.css'
import Details from './components/Details'
import Filters from './components/Filters'
import './components/Header'
import Header from './components/Header'
import Results from './components/Results'

function App() {



  return (
    <>
      <Header/>
      <div className=" flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch">
        <div>
          <Filters/>
        </div>
        <div>
          <Results/>
        </div>
        <div>
          <Details/>
        </div>
        </div>
    </>
  )
}

export default App
