import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
    <div>
      <h2 className='center-text'>Don't show up as</h2>
      <h1 className='center-text'>K[NULL]E</h1>
      <p className='center-text'>Join the future of social media</p>
      <Link to={'/profile'}>
        <button>Click Here</button>
      </Link>
    </div>
    </>
  )
}

export default App
