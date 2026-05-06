import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  const copyPassToClipboard = useCallback(() => {
    passRef.current?.select()
    passRef.current?.setSelectionRange(0, 30)
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <div className="wrapper">
      <h1 className="title">Password Generator</h1>

      <div className="input-row">
        <input
          type="text"
          value={password}
          className="pass-input"
          placeholder="password"
          readOnly
          ref={passRef}
        />
        <button onClick={copyPassToClipboard} className="copy-btn">
          Copy
        </button>
      </div>

      <div className="controls">

        <div className="control-item">
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className="control-item">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className="control-item">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

      </div>
    </div>
  )
}

export default App