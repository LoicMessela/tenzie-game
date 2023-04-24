import React from 'react'

function Die({ value, isHeld, holdDice }) {
  const style = {
    backgroundColor: isHeld ? '#59E391' : '',
  }

  return (
    <div className="die-face" style={style} onClick={holdDice}>
      <h2 className="text">{value}</h2>
    </div>
  )
}

export default Die
