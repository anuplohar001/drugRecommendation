import React from 'react'
import { Link, Outlet } from 'react-router'
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from 'react-router';
const Navbar = () => {

    const navigate = useNavigate()
    const { isAuthenticated, logout } = useContext(AuthContext);
    const protectRoute = async () => {
        if (isAuthenticated)
            navigate('/system')
        else
            navigate('/login')
    }
  return (
      <div className='fixed top-0 left-0 right-0 w-[100%] z-30'>
          <div className='text-black bg-[rgb(165,211,224)] flex justify-between '>
              <Link to={'/'}>
                  <div className='m-3 p-2 w-[450px] text-2xl'>Drug Recommendation System</div>
              </Link>
              <nav >
                  <ul className='flex justify-between '>
                      <Link to={'/'} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-[100px]'>Home</Link>
                      <span onClick={protectRoute} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-fit'>Recommendation System</span>
                      <Link to={'/availability'} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-fit'>Drug Availability</Link>
                      {
                        isAuthenticated ? (<>
                              <Link to={'/profile'} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-[100px]'>My Profile</Link>
                              <Link to={'/'} onClick={logout} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-[100px]'>Logout</Link>
                          </>) : (<><Link to={'/login'} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-[100px]'>Login</Link>
                              <Link to={'/signup'} className='hover:bg-[#068686] hover:text-white duration-500 text-center cursor-pointer m-3 p-2 rounded-md w-[100px]'>Signup</Link></>)
                      }
                      
                  </ul>
              </nav>
          </div>
          <Outlet/>
    </div>
  )
}

export default Navbar
