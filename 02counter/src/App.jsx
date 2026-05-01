import { useState } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  function addValue() {
    if (counter < 20) {           // upper limit
      setCounter(counter + 1)
    }
  }

  function removeValue() {
    if (counter > 0) {            // lower limit, can't go below 0
      setCounter(counter - 1)
    }
  }

  return (
    <div>
      <h1>Counter value: {counter}</h1>
      <button onClick={addValue}>Increase value</button>
      <button onClick={removeValue}>Decrease value</button>
    </div>
  )
}

export default App