import React from 'react'
import { Form 
} from 'react-router-dom'
const Register = () => {
  return (
    <section className='w-full sm:w-[400px] h-[400px] absolute top-0 left-0 bottom-0 right-0 m-auto bg-blue-300 text-center'>
    <h1 className='text-[2rem]'>Register</h1>
    <Form className='flex flex-col grow justify-evenly items-center mt-4' >
        {/* <div className='flex flex-col items-center'> */}
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                className='w-1/2'
                required
            />
        {/* </div> */}

        {/* <div className='flex flex-col items-center'> */}
        <label htmlFor="password">Password:</label>
            <input
                type="password"
                name="password"
                className='w-1/2'
                required
            />
        {/* </div> */}
       
        <button>Register</button>
        {/* <div className="persistCheck">
            <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
            />
            <label htmlFor="persist" className='trustDevice'>Trust This Device</label>
        </div> */}
    </Form>
</section>

  )
}

export default Register