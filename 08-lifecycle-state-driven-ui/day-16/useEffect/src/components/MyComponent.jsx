/// useEffect() = React hook that tells to execute SOME CODE WHEN: (pick one):
//                  This component re-renders
//                  This component mounts
//                  The state of a value changes

// useEffect(funtion, [dependencies])


// 1. useEffect(() => {})           // Runs after every re-render
// 2. useEffect(() => {}, [])        // Runs only on mount
// 1. useEffect(() => {}, [value])           // Runs on mount + when value changes


///USE
// #1 Event Listeners
// #2 DOM Manipulation
// #3 Fetching Data from an API
// #4 Clean up when a component unmounts
// #5 Subscriptions (real time updates)


import React,{useEffect, useState} from "react";


export default function MyComponent(){

    const [count, setCount] = useState(0);
    const [color, setColor] = useState("green");

    //useEffect(Function,[dependencies]);
    // everytime this component re-renders what you would like to do 
    // useEffect(() =>{
    //     document.title = `Count: ${count}`;
    // })

     useEffect(() =>{
        document.title = `Count: ${count} ${color}`;  ///`Count: ${count}`
    },[])

    function addCount(){
        setCount(c => c + 1);
    }

    function subCount(){
        setCount(c => c - 1);
    }

    function changeColor(){
        setColor(c => c === "green" ? "red" : "green");
    }



    return(
    <>
    <p style={{color: color}}>Count : {count}</p>
    <button onClick = {addCount}> Add </button>
    <button onClick = {subCount}> Subtraction </button><br/>
    <button onClick = {changeColor}> Change Color </button>
    
    </>);
}