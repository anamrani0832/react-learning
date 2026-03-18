import { useState, useCallback, useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopy] = useState(false)

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += "!@#$%^&*()_+=-[]{}~"
    for (let i = 1; i <= length; i++) {
      let char = (Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000);

  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 pb-4'>
        <h1 className='text-white text-center my-3'>Password
          Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white'
            placeholder='password'
            readOnly
            ref = {passwordRef}

          />
         <button
  onClick={copyPasswordToClipboard}
  className={`outline-none text-white px-3 py-0.5 transition-all duration-300 ${
    copied ? "bg-green-600" : "bg-blue-700"
  }`}
>
  {copied ? "Copied!" : "Copy"}
</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Lenght: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev) => !prev)
            }}

             />
             <label htmlFor='numberInput'>Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed((prev) => !prev)
            }}

             />
             <label htmlFor='charachterInput'>Charachters</label>

          </div>
        </div>
      </div>

    </>
  )
}

export default App
