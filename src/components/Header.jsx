import React from 'react';
import { Form } from 'react-router-dom';

// const headerAction = () => {

// }

const Header = () => {
  return (
    <header className='w-full h-[300px] bg-red-600 flex flex-col'>
        <p className='w-full h-[290px]'>Image</p>
        <Form>
          <input
        type='file'
        />  
        </Form>
    </header>
  )
}

export default Header;