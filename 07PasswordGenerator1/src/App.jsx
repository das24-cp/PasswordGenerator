import { useEffect,useRef,useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [CharAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const passwordref=useRef(null);
  const CopytoClipboard=useCallback(()=>{
  passwordref.current?.select(); 
  window.navigator.clipboard.writeText(password);
  },[password])
  const passwordGenerator=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str+="1234506789"
  if(CharAllowed) str+="~`!@#$%^&*()_+={}[]:;<>,.";

  for (let i = 0; i < length; i++) {
    let char= Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(char);
  }
  setPassword(pass);
  },[length,numberAllowed,CharAllowed]);

  useEffect(()=>{
  passwordGenerator()
  },[length,numberAllowed,CharAllowed,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg 
      px-4 py-3 my-8 bg-slate-300 text-black'>
        <h1 className=' text-black text-center py-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg
         overflow-hidden mb-4'>
         <input
         type='text'
         value={password}
         className=' outline-none w-full py-2 px-3'
         placeholder='password'
         readOnly
         ref={passwordref}>
         </input>
           <button
           onClick={CopytoClipboard}
           className=' outline-none bg-blue-500 text-white py-3 px-0.5 shrink-0  '>
           Copy
           </button>

        </div>
        <div className=' flex text-sm gap-x-2'>
          <div className=' flex text-center gap-x-1'>
            <input
             type="range"
             min={6}
             max={80}
             value={length}
             className=' cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length: {length}</label>
          </div>
          <div className=' flex text-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id='Number input'
            onChange={()=>{
              setNumberAllowed(prev=>!prev)
            }}
            />
            <label htmlFor="Numberinput">Numbers</label>
          </div>
          <div className=' flex text-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={CharAllowed}
            id='CharacterAllowed'
            onChange={()=>{
              setCharAllowed(prev=>!prev)
            }}
            />
            <label htmlFor="CharacterAllowed">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
