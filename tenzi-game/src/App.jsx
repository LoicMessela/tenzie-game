import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import './App.css'
import Die from '../Components/Die'
import { nanoid } from 'nanoid'
function App() {
  const allNewDice = () => {
    const newArr = []
    for (let i = 0; i < 10; i++) {
      newArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      })
    }
    return newArr
  }

  // console.log(allNewDice())

  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  useEffect(() => {
    const allDice = dice.every((die) => die.value)
    const firstDice = dice[0].value
    const checkDice = dice.every((die) => die.value === firstDice)
    if (allDice && checkDice) {
      setTenzies(true)
      console.log('You don won')
    }
  }, [dice])

  const numb = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => {
        holdDice(die.id)
      }}
    />
  ))

  const handleClick = () => {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
              },
        ),
      )
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  const holdDice = (id) => {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die,
      ),
    )
  }

  return (
    <main>
      {tenzies ? <Confetti /> : ''}
      <h1 className="title">Tenzie Game</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="die-container">{numb}</div>
      <button className="roll-btn" onClick={handleClick}>
        {tenzies ? 'New game' : 'Roll'}
      </button>
    </main>
  )
}

export default App
