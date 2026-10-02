import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MyComponent from './components/MyComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1> useEffect Example</h1>
    <MyComponent/>

    </>
  )
}

export default App
