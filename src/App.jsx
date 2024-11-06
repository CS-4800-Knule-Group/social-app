import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
    <div>
      <h2 className='center-text'>Don't show up as</h2>
      <h1 className='center-text'>K[NUL]E</h1>
      <p className='center-text'>Join the future of social media</p>
      <div className='center-text'>
        <Link to={'/register'}>
          <button>Click Here</button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default App
