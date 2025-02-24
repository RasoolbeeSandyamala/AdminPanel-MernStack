import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {assets} from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { DoctorContext } from '../../context/DoctorContext';


const Dashboard = () => {

  const{aToken, getDashData, dashData} = useContext(AdminContext)
   const {slotDateFormat} = useContext(AppContext)
  const{cancelAppointment,completeAppointment} = useContext(DoctorContext)

  // const {slotDateFormat} = useContext(AppContext)
  useEffect(() =>{
      
    if (aToken) {
      getDashData()
    }
  },[aToken])

  return dashData && (
    <>
      
        <div className='container d-flex gap-3 mt-2 flex-wrap'>
          <div className='d-flex gap-2 border bg-light border-1 rounded p-2 mb-5 border-secondary '>
            <div> <img src={assets.doctor_icon} alt="" /></div>
           
            <div className='mt-2'>
              {dashData.doctors}
             <p>Doctors</p> 
            </div>
          </div>

          <div  className='d-flex gap-2 border bg-light border-1 rounded p-2 mb-5 border-secondary '>
            <div> <img src={assets.appointments_icon} alt="" /></div>
           
            <div className='mt-2'>
              {dashData.appointments}
              <p>Appointments</p>
            </div>
          </div>

          <div  className='d-flex gap-2 border bg-light border-1 rounded p-2 mb-5 border-secondary '>
            <div>  <img src={assets.patients_icon} alt="" /></div>
          
            <div className='mt-2'>
              {dashData.patients}
              <p>Patients</p>
            </div>
          </div>
        </div>
      
      <div className='bg-light ms-3 border border-1 rounded-3 border-secondary mb-3 p-3 shadow '>
        <div className='d-flex gap-2 mb-3 '>
          <img className='ms-3' src={assets.list_icon} alt="" />
          <p className='mt-3'>Latest Bookings</p>
        </div>
        <div className="container ">

  {
      dashData.latestAppointments.map((item, index) => (
    <div key={index} className="d-flex align-items-center justify-content-between border  p-3 mb-2 shadow-sm rounded">
      
      {/* Doctor Image */}
      <img src={item.docData.image} alt="Doctor" className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />

      {/* Doctor Info & Date */}
      <div className="flex-grow-1">
        <p className="fw-bold mb-2">{item.docData.name}</p>
        <p className="text-muted mb-0">{ slotDateFormat(item.slotDate)}</p>
      </div>

      {/* Cancel Icon or Status */}
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

       
      </div>
      
    </>
  );
}

export default Dashboard;
