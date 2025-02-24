
import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import {assets} from '../../assets/assets'


const DoctorAppointment = () => {

const {dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext)

const {calculateAge,slotDateFormat,currency} = useContext(AppContext);

useEffect(() => {
 if (dToken) {
    getAppointments()
 }
}, [dToken]);

  return (
    <>
    <p className='fs-4 fw-bold text-primary '>All Appointments</p>
     <div className='bg-light'>
        
        <div className='container mt-3'>
     <div class="row text-center  fw-bold py-2">
        <div className="col-1">#</div>
        <div className="col-2">Patient</div>
        <div className="col-1">Payment</div>
        <div className="col-2">Age</div>
        <div className="col-2">Date & Time</div>
        <div className="col-2">Fees</div>
        <div className="col-2">Action</div>
    </div>
    <hr />
      {appointments.reverse().map((item,index)=>(
               <div key={index} className='row text-center bg-light fw-bold py-2'>
               <div className="col-1">{index+1}</div> 
                <div className='col-2'>
                  <img style={{width:'50px'}} className='rounded-pill' src={item.userData.image} alt="" /> {item.userData.name}
                </div>
                <div className="col-1">{item.payment ? 'online' :'CASH' }</div>
                <div className="col-2">{calculateAge(item.userData.dob)}</div>
                <div className="col-2">{slotDateFormat(item.slotDate)}, {item.slotTime}</div>
              
                <div className="col-2">{currency} {item.amount}</div>
                
                {item.cancelled
    
                 ? <div className="col-2 text-danger mt-2 fs-5">cancelled</div>
    
                 : item.isCompleted
                 ? <div className='col-2 text-success fs-5'>Completed</div>

                 : <div className="col-2"> <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" style={{cursor:'pointer'}} />
                  <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" style={{cursor:'pointer'}} />
                 </div>
                }
               
               </div>
               
              ))}
            
            </div>
            <hr />
          </div>
    
    </>
  );
}

export default DoctorAppointment;
