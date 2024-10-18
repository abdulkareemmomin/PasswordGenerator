import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%&*?|\?"

    for (let i = 1; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length); // Get a random index
      pass += str.charAt(char);

    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword])

  const copy = () => {

    if (password) {

      navigator.clipboard.writeText(password)
        .then(() => {
          let passw = document.getElementById("passw");
          passw.select();
          // alert("copy to clipboard");
        }).catch((err) => {
          alert("failed to copy password: ", err);
        })
    }
    else {
      alert("no password to copy");
    }
  };

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-start items-center pt-10'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
          <h1 className='text-3xl text-white text-center my-10'>Password Generator</h1>

          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
              type='text'
              placeholder='Generated Password'
              readOnly
              id='passw'
              value={password}
              className='outline-none rounded-l-lg w-full py-1 px-3'
            />
            <button className='outline-none rounded-r-lg bg-blue-700 text-white px-3 py-1 shrink-0' onClick={copy}>Copy</button>
          </div>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input onClick={passwordGenerator} type='range' min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
              <label>length:{length}</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input onClick={passwordGenerator} className='cursor-pointer' type='checkbox' defaultChecked={numberAllowed} id='numberId' onChange={() => {
                setNumberAllowed((prev) => !prev)
              }} />
              <label>numberAllowed</label>
            </div>


            <div className='flex items-center gap-x-1'>
              <input type='checkbox' className='cursor-pointer' defaultChecked={charAllowed} id='charId' onChange={() => {
                setCharAllowed((prev) => !prev)
              }} />
              <label>CharAllowed</label>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default App
