import React from 'react';
import { Form } from 'react-router-dom';
import InputFile from './InputFile';
// const headerAction = () => {

// }

const Header = () => {
  return (
    <header className='w-full h-[300px] bg-red-600 flex flex-col'>
        <p className='w-full h-[290px] bg-green-500 md:w-1/2 text-center m-auto'>Image</p>
        <Form>
          <input
        type='file'
        />  
        </Form>
    </header>
  )
}

export default Header;