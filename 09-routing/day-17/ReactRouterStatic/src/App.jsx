import { Routes, Route, Link} from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Collage from "./pages/CollegePage"
import NavBar from "./pages/NavBar"


function App() {
 

  return (
    <>
      <h1> Example React Router 7 with React 19</h1>

      {/* <NavBar/> */}

      <Routes>
      <Route element={<NavBar/>}>
        <Route path = "/about" element ={<About/>}/>
        <Route path = "/login" element ={<Login/>}/>
        <Route path = "/" element ={<Home/>}/>
      </Route>
      
      
       

        <Route path = "/collage" element ={<Collage/>}/>
      </Routes>
      

    </>
  )
}

export default App
