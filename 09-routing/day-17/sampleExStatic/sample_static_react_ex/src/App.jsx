
import { Link, Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Login from "./pages/Login"
import NavBar from "./pages/NavBar"
import CollageDetails from "./pages/collageDetails"

function App() {
 
  return (
    <>
      <h1> React Router 8 setup with React 19</h1>
      {/* <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

      <Link to="/about">  About Page</Link> <br/>
      <Link to="/login">  Login Page</Link> */}
      {/* Navbar -Layout Route*/}

      <Routes>
        <Route element={<NavBar/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          
        </Route>
        {/* route outside the layout route */}
        <Route path="/collage" element={<CollageDetails/>}/>

      </Routes>

     


    </>
  )
}

export default App
