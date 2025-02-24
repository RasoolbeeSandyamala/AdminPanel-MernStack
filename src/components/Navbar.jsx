import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';
const Navbar = () => {
 const {aToken,setAToken} = useContext(AdminContext)
 const {dToken,setDToken} = useContext(DoctorContext)

 const navigate = useNavigate()

 const logout = () =>{
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
 }


  return (
    <>
      <div className='d-flex justify-content-between me-3 align-items-center border-bottom '>
        <div className='d-flex gap-3 px-2'>
        <img src={assets.admin_logo} style={{width:'200px',cursor:'pointer'}} alt="" />
        <p className='border border-2 rounded-pill p-1 mt-3 '>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='btn btn-primary rounded-5'>Logout</button>
      </div>
      
    </>
  );
}

export default Navbar;
