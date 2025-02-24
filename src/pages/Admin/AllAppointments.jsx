import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
// import assets from "../../assets/assets.js";
import cancelIcon from "../../assets/cancel_icon.svg";



const AllAppointments = () => {

  const {aToken,appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext)
 
 const{calculateAge,slotDateFormat,currency} = useContext(AppContext)

  useEffect(() =>{
  
    if (aToken) {
      getAllAppointments()
    }
  },[aToken])

  return (
    <>
      <div>
        <p>All Appointments</p>
        <div className='container mt-3'>
     <div className="row text-center  fw-bold py-2">
        <div className="col-1">#</div>
        <div className="col-2">Patient</div>
        <div className="col-1">Age</div>
        <div className="col-2">Date & Time</div>
        <div className="col-2">Doctor</div>
        <div className="col-2">Fees</div>
        <div className="col-2">Actions</div>
    </div>
    <hr />
          {appointments.map((item,index)=>(
           <div key={index} className='row text-center bg-light fw-bold py-2'>
           <div className="col-1">{index+1}</div> 
            <div className='col-2'>
              <img style={{width:'50px'}} className='rounded-pill' src={item.userData.image} alt="" /> {item.userData.name}
            </div>
            <div className="col-1">  {isNaN(calculateAge(item.userData.dob)) ? "N/A" : calculateAge(item.userData.dob)}
            </div>
            <div className="col-2">{slotDateFormat(item.slotDate)}, {item.slotTime}</div>
            <div className="col-2"><img style={{width:'50px'}} className='rounded-pill bg-primary' src={item.docData.image} alt="" /> {item.docData.name}</div>
            <div className="col-2">{currency}{item.amount}</div>
            
            {item.cancelled

             ? <div className="col-2 text-danger mt-2 fs-5">cancelled</div>

             : item.isCompleted ?  <div className="col-2 text-success mt-2 fs-5">completed</div> :<div className="col-2"> <img onClick={()=>cancelAppointment(item._id)} src={cancelIcon} alt="" style={{cursor:'pointer'}} /></div>
            }
           
           </div>
           
          ))}
        
        </div>
        <hr />
      </div>
    </>
  );
}

export default AllAppointments;
