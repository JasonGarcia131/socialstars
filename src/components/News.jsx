import { Link } from "react-router-dom";

const News = () => {

    return (
        <div className='w-full h-screen bg-space-background'>
            <section className='w-[400px] h-[400px] flex flex-col absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                <Link to="/dashboard" className="underline">Home</Link>
                <br />
                <h1>Upcoming Features: </h1>
                <br />
                <p>- Search friends by zodiac sign.</p>
                <br />
                <p>- Private Messaging.</p>
            </section>
        </div>
    )
}

export default News;