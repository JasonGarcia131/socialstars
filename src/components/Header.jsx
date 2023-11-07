import { useSearchParams } from 'react-router-dom';
import { horoscopeImages } from '../data';

// use these props and functions when edit banner feature is implemented
// import InputFile from './InputFile';
//  id, bannerImageLight, bannerImageShadow, isPublic,
// const imageUrl = theme === 'light' ? bannerImageLight : bannerImageShadow;
// {
//     !isPublic && <InputFile theme={theme} imageKey={'banner'} userId={id} id={"editBannerImage"} label={'Edit'} />
// }
// return (
        // <header className='w-full h-[500px] flex flex-col'>
        //     <div className={`w-full h-[100%] bg-[url(${im})] bg-contain bg-no-repeat bg-center md:w-1/2 text-center m-auto`}></div>
        // </header>
    // )

const Header = ({horoscopeSign }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const bg = horoscopeImages.find(image=>image.horoscope === horoscopeSign);
    const image = searchParams.get("theme") === "shadow" ? bg.image.shadow : bg.image.light;
    return (
        <header className='w-full h-[450px] flex flex-col'>
            <img className={`w-full h-[100%] m-auto md:max-w-[700px]`} src={image} />
        </header>
    )
}

export default Header;