import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <>
      <div className='px-10 py-2 bg-black  h-[12vh] border-b text-[2rem] font-bold'> 
        <div className='text-gradient'>
          <Link to='/' >
            Code Share
          </Link>
        </div>
      </div>
    </>
  )
}