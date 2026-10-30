import { Routes, Route, Link} from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Collage from "./pages/CollegePage"
import NavBar from "./pages/NavBar"
import UsersList from "./pages/UsersList"
import UserDetails from "./pages/UserDetails"


function App() {
 

  return (
    <>
      <h1> Example React Router 7 with React 19</h1>

       {/* 
        ROUTING CONCEPT (VERY IMPORTANT)

        <Routes> acts like a container for all route definitions.
        Inside it, each <Route> defines:
        - URL path
        - Which component should render

        React Router matches the current browser URL to these paths.
      */}

      <Routes>
        {/*
          NESTED ROUTING

          This route does NOT have a path.
          Instead, it provides a routing layout (NavBar) for all child routes.

          Think of it as:
          NavBar is always visible when any of the below routes are active.
        */}
      <Route element={<NavBar/>}>
        <Route path = "/about" element ={<About/>}/>
        <Route path = "/login" element ={<Login/>}/>
        <Route path = "/" element ={<Home/>}/>
        <Route path = "/users/" element ={<UsersList/>}/>
        <Route path = "/users/:id" element ={<UserDetails/>}/>
          {/*
            DYNAMIC ROUTE (CORE CONCEPT)

            ":id" is a ROUTE PARAMETER (dynamic value)

            Example URLs:
            /users/1
            /users/25
            
            React Router will:
            - Match this route
            - Extract "id" from URL
            - Pass it to the component via useParams()

            So:  /users/5 → id = "5"
          */}
      </Route>
      
        
       

        <Route path = "/collage" element ={<Collage/>}/>
      </Routes>
      

    </>
  )
}

export default App
