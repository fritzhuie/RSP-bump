import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../services/gameServices'
import { sendBump, getMatch, BumpDetector } from '../../services/gameServices'
import { useState, useEffect } from 'react'
import '../../services/networkState.js'


const Game = () => {

  const navigate = useNavigate()

  const [choice, setChoice] = useState(null)
  const [status, setStatus] = useState("Waiting for bump")
  const [isBumpEnabled, setIsBumpEnabled] = useState(true)

  const handleHistoryNav = () => {
    navigate('/history')
  }

  const sendBumpEvent = async () => {
    const preBumpHistory = await getMatch()
    console.log("preBumpHistory: ", preBumpHistory)
    if ( !preBumpHistory ) { return }
    setStatus("preBumpHistory exists")

    const bumpResult = await sendBump(choice)
    console.log("bumpResult ", bumpResult)
    if ( !bumpResult ) { return }
    setStatus("bumpResult exists")

    setChoice(null)

    setTimeout(async () => {
      const resultHistoryResponse = await getMatch()
      console.log("resultHistoryResponse: ", resultHistoryResponse)
      if ( !preBumpHistory ) { return }
      setStatus("Bump completed")

      if ( resultHistoryResponse != preBumpHistory ) {
        navigate('/matchresult')
      }
    }, 100)

    setTimeout(() => setIsBumpEnabled(true), 1)
  }

  const handleBump = () => {
    if (!choice || !isBumpEnabled) { return }
    setStatus("Bump callback was called!")
    setIsBumpEnabled(false)

    sendBumpEvent()
  }

  const handleSelection = (choice) => {
    if (!isBumpEnabled) { return }
    setChoice(choice)
  }

  const bumpDetector = new BumpDetector(handleBump)

  useEffect(() => {
    bumpDetector.startDetection()
  }, [])

  return (
    <>
      <h1>Game page</h1>
      <div>
        <button className='rock-button'
          style={{ borderRadius: '50%', 
          width: '100px', height: '100px', 
          backgroundColor: choice === "Rock" ? 'green' : 'grey'}} 
          onClick={() => handleSelection('Rock')}
        >
          Rock
        </button>
        <button className='paper-button'
          style={{ borderRadius: '50%', 
          width: '100px', height: '100px',
          backgroundColor: choice === "Paper" ? 'green' : 'grey' }} 
          onClick={() => handleSelection('Paper')}
        >
          Paper
        </button>
        <button className='scissors-button'
          style={{ borderRadius: '50%',
          width: '100px', height: '100px',
          backgroundColor: choice === "Scissors" ? 'green' : 'grey' }} 
          onClick={() => handleSelection('Scissors')}
        >
          Scissor
        </button>
      </div>
      <button onClick={handleHistoryNav}>go to history page</button>
      <button onClick={handleBump}>TEST BUMP</button>
      <p>{status}</p>
      
    </>
  )
}

export default Game