import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSearchParams } from "react-router-dom";

const InputFile = (props) => {
    const {imageKey, id, label, userId } = props;
    const axiosPrivate = useAxiosPrivate();
    const [searchParams, setSearchParams] = useSearchParams();
    const theme = searchParams.get("theme")
    const [uploadBtn, setUploadBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState({
        theme: theme,
    })

    // Dynamically positions resusable input field
    const classOptions = imageKey === "banner" ? "absolute top-0" : ""
  
    // Watches changes for file input
    const handleChange = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const file = e.target.files[0];
        if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setIsLoading(false);
                setUploadBtn(true);
                //Sets the name of the key based on the string that was passed in the props.
                //This is for the userControllers to know which field to update in the Users db collection. 
                if (imageKey === "banner") setImage((prevData) => ({ ...prevData, image: reader.result }));
                if (imageKey === "profilePicture") setImage({ profilePicture: reader.result });

            }
        }
    }

    const handleSubmit = async () => {
        const response = await axiosPrivate.put(`/users/${userId}`, image);
        if (response.status === 200) {
            setUploadBtn(false);
            location.reload();
        } else {
            setMessage("Could not upload image!");
        }
    }

    return (
        <div className="m-4">
            <label htmlFor={id} id="inputLabel" className={`${classOptions} p-2 border rounded-full bg-pink-950 text-white`}>{label}</label>
            {message}
            <input
                type="file"
                id={id}
                accept="/image/*"
                style={{ display: "none" }}
                onChange={(e) => handleChange(e)}
            />
            {
                isLoading
                    ? <p>Uploading...</p>
                    : uploadBtn
                        ? <button className='text-4xl' onClick={() => handleSubmit()}>Upload</button>
                        : null
            }
        </div>

    )
}

export default InputFile;