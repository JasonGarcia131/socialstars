import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='w-full flex justify-around fixed bottom-0 border border-solid md:w-[50px] md:h-[300px] md:flex md:flex-col md:top-0 md:right-1 md:text-right'>
      <a>Home</a>
      <a>Light</a>
      <a className='text-sm'>Shadow</a>
    </nav>
  )
}

export default Nav