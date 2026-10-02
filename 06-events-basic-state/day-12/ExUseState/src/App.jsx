
import { useState } from "react";
import User from './component/User';

function App() {

  //let course = "SDEV";
  const [course, setCourse] = useState("SDEV");
  console.log(course);


  // useState return an array of size 2: crrent calue, fn to update value
  // const myvar = useState(0);
  // const counter  = myvar[0];
  // const setCounter = myvar[1];

  const [counter, setCounter] = useState(0);

  //console.log(`Myvar has two elements :  ${myvar}`);
  //console.log(`Myvar First element is :  ${counter}`);

  const [display , setDisplay ] = useState(false);


  function update() {

    setCourse("CPSE");
    //setCounter(counter++)
  }

  function increment() {

    setCounter(counter + 1);
    //setCounter(counter++)
  }

  function toggleDisplay(){

    setDisplay(!display);
    
  }


  return (
    <>
      <h1> compare variable with state </h1>
      <p> the value of course is : {course}</p>
      <p> the value of counter is : {counter}</p>

      <h1> Toggle Display</h1>
      <button onClick={toggleDisplay}> toggle </button>
      {display ? <User name={"Alex"}/> : null};
      

      <hr></hr>


      <button onClick={update}>Update</button>
      <button onClick={increment}>Counter</button>
    </>
  )
}

export default App
