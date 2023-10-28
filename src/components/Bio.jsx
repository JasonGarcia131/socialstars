import React from 'react'

const Bio = () => {
  return (
    <section className='h-[250px] bg-yellow-300 text-center p-4'>
            <div className='w-[130px] h-[130px] rounded-full bg-green-500 mx-auto'>
                <p>image</p>
            </div>
            <input
                type='file'
            /> 
        <div>
            <p>bio</p>
        </div>
        <div>
            <p>posts</p>
        </div>
    </section>
  )
}

export default Bio