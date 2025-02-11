import React from 'react'
import bgimg from "../assets/bgimg.jpeg"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()
  const protectRoute = async () => {
    if (isAuthenticated)
      navigate('/system')
    else
      navigate('/login')
  }

  return (
    <div className='text-black'>

      <div className='flex flex-col'>
        <div className='z-20 m-[200px] text-center'>
          <div className=' font-bold text-5xl text-center'>
            Welcome to The Drug Recommendation System
          </div>
          <button onClick={protectRoute} className='m-9 border-2 border-black'>Go to System</button>
        </div>
        <img className='w-[100%] h-[90vh] absolute z-0' src={bgimg} alt="bgimg" />
      </div>
    </div>
  )
}

export default Home
