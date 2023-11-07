import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Feedback = () => {

    const [feedback, setFeedback] = useState({
        content: ""
    });

    const [message, setMessage] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (feedback.content.length < 1) return setMessage("Seems like your comment is blank.");

            if (feedback.content.length > 100) return setMessage("Seems like your comment is too long.");
    
            const response = await axiosPrivate.post('/feedback', feedback);

            setFeedback({
                content: ""
            });

            setMessage("Thank you for your feedback.");
        } catch (e) {
            setMessage("Something went wrong.")
        }
    }


    return (
        <div className='w-full h-screen bg-space-background p-2'>
            <section className='w-[400px] h-[400px] p-4 absolute top-0 left-0 bottom-0 right-0 m-auto rounded-2xl bg-stone-950/[0.9] text-center text-slate-300'>
                <Link to="/dashboard" className="underline">Home</Link>
                <h1 className="text-2xl my-2">Feedback</h1>
                <p>Your feedback can help improve the app's design.</p>
                <textarea
                    className='w-full h-[100px] border-4 text-black'
                    placeholder="Your feedback is very appreciated."
                    maxLength={100}
                    name='feedback'
                    value={feedback.content}
                    onChange={(e) => setFeedback({ content: e.target.value })}
                />
                <p>{message}</p>
                <br/>
                <button className='w-[100px] rounded-full bg-pink-950' onClick={handleSubmit}>Submit</button>
            </section>
        </div>
    )
}

export default Feedback;