import InputFile from './InputFile';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Header = ({id, bannerImageLight, bannerImageShadow }) => {
    const theme = useContext(ThemeContext);
    const imageUrl = theme === 'light' ? bannerImageLight : bannerImageShadow;
    return (
        <header className='w-full h-[300px]flex flex-col'>
            <img className='w-full h-[full] bg-green-500 md:w-1/2 text-center m-auto' src={imageUrl} />
            <InputFile theme={theme} imageKey={'banner'} userId={id} id={"editBannerImage"} label={'Edit'} />
        </header>
    )
}

export default Header;