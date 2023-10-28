import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='w-full flex justify-around fixed bottom-0 border border-solid '>
      <a>Home</a>
      <a>Light</a>
      <a>Shadow</a>
    </nav>
  )
}

export default Nav