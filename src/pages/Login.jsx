import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  
    const [state,setState] = useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)
    const onSubmitHandler = async (event) => {
         
          event.preventDefault()

          try {
            
            if (state === 'Admin') {
              
              const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
               if (data.success) {
                   localStorage.setItem('aToken',data.token)
                  setAToken(data.token);
                  // console.log(data.token);
               }else{
                toast.error(data.message)
               }
            }else{
               
              const{data} = await  axios.post(backendUrl + '/api/doctor/login',{email,password})
              if (data.success) {
                localStorage.setItem('dToken',data.token)
               setDToken(data.token);
               console.log(data.token);
            }else{
             toast.error(data.message)
            }

            }
          } catch (error) {
            
          }
    }

  return (
    <>
    <div className='loginform'>
    <form action=""  onSubmit={onSubmitHandler}>
        <div className='w-full d-flex flex-column  gap-3 p-5 shadow  border rounded '>
            <p className='fs-4 fw-bold login1'><span className='text-primary'>{state}</span> Login</p>
            <div>
                <p>Email</p>
                <input type="email" class="form-control" onChange={(e)=>setEmail(e.target.value)} value={email} required />
            </div>
            <div>
                <p>Password</p>
                <input type="password" class="form-control"  onChange={(e)=>setPassword(e.target.value)} value={password}  required />
            </div>
             <button className='btn btn-primary mt-3 mb-2'>Login</button>
           {
            state === 'Admin'
            ? <p className='login2'>Doctor Login ?<span className='text-primary ms-2 text-underline ' onClick={()=>setState('Doctor')}>Click here</span></p>
            : <p className='login2'>Admin Login ? <span className='text-primary ms-2 text-underline ' onClick={()=>setState('Admin')}>Click here</span></p>
           }
        </div>
    </form>
    </div> 
    </>
  );
}

export default Login;
