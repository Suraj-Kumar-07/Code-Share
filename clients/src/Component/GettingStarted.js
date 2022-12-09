import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Link } from "react-router-dom"; 

function GettingStarted() {
  return (
    <div>
        <Navbar/>
        <div className='conatiner bg-gray-800 h-[80vh]'>
            <div className='flex justify-center items-center space-x-6 h-[80vh]'>
                    <Link to="/create">
                    <button className='btn-primary text-2xl font-bold'>
                    Create Room
                    </button>
                    </Link> 
                    <Link to="/join">
                    <button className='btn-primary text-2xl font-bold '>
                    Join Room
                    </button>
                    </Link>
                    
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default GettingStarted