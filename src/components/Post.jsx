import React from 'react'

const Post = ({ username }) => {
    return (
        <div className='mb-6'>
            <article className='w-full h-[140px] flex flex-col border-4 p-2'>
                <div className='flex justify-between'>
                    <div className='w-[70px] h-[70px] rounded-full bg-green-500'><p>image</p></div>
                    <p className='flex-1 mx-2'>username</p>
                    <div>date</div>
                </div>
                <div className='overflow-scroll'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate molestias quaerat laborum ratione aperiam quos maiores suscipit? Fugiat, reiciendis dolor culpa doloremque accusamus pariatur commodi adipisci harum similique doloribus magnam optio officia laborum! Voluptas, perferendis! Corporis, earum necessitatibus. Odit, molestiae?</div>
            </article>
            <p>...</p>
        </div>
    )
}

export default Post