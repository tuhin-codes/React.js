import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'    // ← add this line

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div className="wrapper">
      <div className="card">
        <h1 className="heading">Currency Converter</h1>

        {/* From */}
        <label className="label">From</label>
        <div className="input-row">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="input"
          />
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="select"
          >
            {options.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Swap */}
        <div className="swap-row">
          <button onClick={swap} className="swap-btn">⇅ Swap</button>
        </div>

        {/* To */}
        <label className="label">To</label>
        <div className="input-row">
          <input
            type="number"
            value={convertedAmount}
            readOnly
            className="input readonly"
          />
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="select"
          >
            {options.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Convert Button */}
        <button onClick={convert} className="convert-btn">
          Convert {from.toUpperCase()} → {to.toUpperCase()}
        </button>
      </div>
    </div>
  )
}

export default App