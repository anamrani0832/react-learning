import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1 class="mb-4 text-3xl font-bold underline">Vite + React</h1>
      <Card username='Norie' btnText='click me'/>
      <Card username='Usman' btnText='visit me'/>
    </>
  )
}

export default App
