import React from 'react';
import useAuth from '../hooks/useAuth';
import { FaHome } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {auth} = useAuth();
  const themeClass = searchParams.get("theme") === "shadow" ? 'bg-black/50 text-white border-white' : 'bg-white/50 text-black border-black';
  return (
    <nav className={`w-full h-[40px] flex justify-around items-center fixed bottom-0 font-bold border-t-2 ${themeClass} md:border-none rounded-xl md:w-[50px] md:h-[300px] md:flex md:flex-col md:top-0 md:right-2 md:m-0 md:text-center`}>
      <Link to={auth?.accessToken ? '/dashboard' : '/'} className='md:mx-auto'><FaHome className='text-2xl'/></Link>
      <button onClick={()=>setSearchParams({"theme": "light"})}>Light</button>
      <button onClick={()=>setSearchParams({"theme":"shadow"})} className='text-sm'>Shadow</button>
    </nav>
  )
}

export default Nav;