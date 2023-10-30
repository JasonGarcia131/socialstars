import React from 'react';
import { Form } from 'react-router-dom';
import InputFile from './InputFile';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({ bannerImageLight, bannerImageShadow }) => {
    const theme = useContext(ThemeContext);
    const imageUrl = theme === 'light' ? bannerImageLight : bannerImageShadow;
    return (
        <header className='w-full h-[300px]flex flex-col'>
            <img className='w-full h-[full] bg-green-500 md:w-1/2 text-center m-auto' src={imageUrl} />
            <Form>
                <input
                    type='file'
                    className='absolute top-0'
                />
            </Form>
        </header>
    )
}

export default Header;