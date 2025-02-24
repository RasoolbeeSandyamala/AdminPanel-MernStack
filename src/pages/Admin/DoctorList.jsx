import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorList = () => {

  const {doctors,aToken,getAllDoctors,changeAvailability} = useContext(AdminContext)

  useEffect(()=>{
if (aToken) {
  getAllDoctors()
}
  },[aToken])
  return (
    <>
      <div className='m-2 overflow-y-scroll bg-light rounded'>
        <h1 className='fw-bold fs-2 mb-4 ms-4 mt-3'>All Doctors</h1>
        <div className='d-flex gap-3 flex-wrap ms-4'>
          {
            doctors.map((item,index)=>(
              <div key={index} className='border rounded-3 mb-3 '>
              <img src={item.image} alt="" style={{width:'200px',backgroundColor:'#cfe2ff'}} className='doctorhover' />
              <div className='p-3'>
                <p className='fs-5  fw-bold'>{item.name}</p>
                <p className='text-secondary'>{item.speciality}</p>
                <div className='d-flex gap-2'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p className='mt-3'>Available</p>
                </div>
              </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default DoctorList;
