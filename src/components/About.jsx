import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const About = () => {

    const { auth } = useAuth();
    //If user is logged in then back link will send them to the dashboard route.
    const link = auth?.accessToken ? "/dashboard" : "/";

    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                <Link className=' underline' to={link}>back</Link>
                <h1 className="text-2xl my-4">About Stars</h1>
                <p>Stars is a digital journal that allows you to share positive affirmations or deep, heavy thoughts that need to be vented.</p>
                <p>We all need a place to </p>
                <p>You can select whether a post is public or private for your own read.</p>
                <p>Each type of post is shown through a "light" and "shadow" theme to filter your thoughts.</p>
            </section>
        </div>
    )
}

export default About;