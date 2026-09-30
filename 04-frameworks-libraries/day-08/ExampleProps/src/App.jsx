
import './App.css'
import User from './components/User'

function App() {

  let name = "Baljeet";
  let id = 28;
  let wish = true;
 
  return (
    <>
      <h1> Welcome to top component: APP</h1>
      <User name = {name} stid={id} str = "hello">
        {wish && (<span> This is sample child code</span>)}
      </User>
      {/* <p> user name is : {name}</p> */}
    </>
  )
}

export default App
