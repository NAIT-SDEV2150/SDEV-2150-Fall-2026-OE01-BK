//import { useState } from "react";
import useToggle from "./hooks/useToggle"

function App() {

 // const [isOn, setON] = useState(false);
 const [isOn, toggleIsOn] = useToggle(false);

  // function toggle() {
  //   setON(!isOn)
  // }


  return (
    <>
      <h1> Costom Hook Example with toggle</h1>
      <p> The switch is : <strong> {isOn ? "ON" : "OFF"}</strong></p>

      <button onClick={toggleIsOn}> TOGGLE</button>
    </>
  )
}

export default App
