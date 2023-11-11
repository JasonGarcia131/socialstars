import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const About = () => {

    const { auth } = useAuth();
    //If user is logged in then back link will send them to the dashboard route.
    const link = auth?.accessToken ? "/dashboard" : "/";
    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[600px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                <Link className=' underline' to={link}>back</Link>
                <h1 className="text-2xl my-4">About Stars</h1>
                <p>Stars is a digital journal that allows you to share positive affirmations or thoughts that need to be vented.</p>
                <p>We all need a place to decompress and social stars is the journal in your fingertips</p>
                <p>You can select whether a post is public or private.</p>
                <p>Each type of post is shown through a "light" and "shadow" theme to filter your thoughts.</p>
                <p>You can share your profile link on your social media for your friends.</p>
                <h2 className="text-xl my-4">Image credits:</h2>
                <ul>
                    <li className="underline"><a href="https://www.pixelstalk.net/wp-content/uploads/2016/08/Free-Universe-Backgrounds.jpg" target="_blank">Home page background</a></li>
                    <li className="underline"><a href="https://www.freepik.com/free-vector/hand-drawn-zodiac-sign-set_14661304.htm#query=zodiac&position=3&from_view=keyword&track=sph" target="_blank">Light zodiac signs</a></li>
                    <li className="underline"><a href="https://www.astroswamig.com/articles/black-zodiac-black-side-of-zodiac-sign" target="_blank">Shadow zodiac signs</a></li>
                </ul>
            </section>
        </div>
    )
}

export default About;