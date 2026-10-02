import { useState } from 'react'
import './App.css'
import Course from './components/Course';


function App() {
 
  // Normal variable (NOT React state), count resets to 0 on every re-render
  let count = 0;
  
  // useState returns an ARRAY with 2 elements: [ currentStateValue, functionToUpdateState ]
  const myvar = useState(0);

  // Extracting elements manually (old-school way)
  const counter = myvar[0];   // current state value
  const setCounter = myvar[1];  // function to update state

  // Modern syntax (array destructuring)
  //const [counter,setCounter] = useState(0)

  // Object state example
  // Storing multiple values inside ONE state object
  const [user,setUser]= useState({userName: "Baljeet", course : "SDEV", code: 2210});

  // conditional rendering Toggle example
  const [display, setDisplay] = useState(true);

  // Console logs to show how useState works internally
  console.log(myvar)
  console.log(`Myvar has two array elements :  ${myvar}`);
  console.log(`First element in My var i.e. counter :  ${counter}`);

  // ================================
  // FUNCTION: Increment values
  // ================================
  
  const increment = () => {
    // Update the state using the previous value to prevent issues with multiple updates
    
    console.log(count);
    //console.log(fruit);
  
    //Updating normal variable, This WILL NOT persist after re-render
    let count = count + 1; 

    // Updating React state, This WILL persist and trigger re-render
    setCounter(counter+1);
  
    //fruit = "Banana"
  
   console.log(count);
    //console.log(fruit);
  };


  // ================================
  // FUNCTION: Update object state
  // ================================

  function updateUser()
  {
    // IMPORTANT: Never overwrite object state directly
    // Always copy previous state using spread operator (...)
    setUser(prev => ({
         ...prev,                            // copy existing properties
         userName: "Baljeet Kaur"}));       // update only one field
  } 

  function toggleDisplay()
  {
    setDisplay(!display);
    
  }
  return (
    <>
      <div className="flex items-center justify-between space-x-4">
        <h2> value of count is : {count} </h2> 
        <h2 className='text-sky-400'> value of counter is : {counter} </h2>
        <h2 className='text-yellow-200'> Username : {user.userName} </h2>
        {/* {display ? <h2> SDEV 2026</h2> : null} */}
      </div>


       <div className="flex items-center justify-between space-x-4">
        <button 
          type='button'
          className="rounded border border-gray-300 px-4 py-2 text-sm font-semibold text-white-700 hover:bg-gray-50"
          onClick={increment}>
          NO-USESTATE count is : {count} 
        </button>
       
        <button className='text-sky-400'
          onClick={increment}>
          useState counter is : {counter} 
        </button>

        <button className='text-yellow-200'
          onClick={updateUser}>
          useState Username is : {user.userName} 
        </button>
        
        
     </div>
    <br/><br/>
    {/*DISPLAY TOGGLE , conditional rendering*/}

     <div className="flex items-center justify-between space-x-4">
        {display ? <h2> SDEV 2026</h2> : <h2> No course has been selected by user</h2>}   
        {/* {display ? <Course/> : null}   */}
      </div>

    <div className="flex items-center justify-between space-x-4">

        <button className='text-white-200'
              onClick={toggleDisplay}>
              Toggle Display 
          </button>
    </div>
    </>
  )
}
export default App