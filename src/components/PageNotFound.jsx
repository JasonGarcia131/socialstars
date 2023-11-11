import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className="w-full h-screen bg-space-background">
            <section className='w-[400px] h-[400px] flex flex-col justify-center absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300 text-2xl'>
                <h1>Oops!</h1>
                <p>Page Not Found</p>
                <div className="flexGrow">
                    <Link className="underline" to="/">Visit Our Homepage</Link>
                </div>
            </section>
        </div>
    )
}

export default PageNotFound;
