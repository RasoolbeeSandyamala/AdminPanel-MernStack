import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import Nav from 'react-bootstrap/Nav';
import { DoctorContext } from '../context/DoctorContext';
const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  return (
    <>
      <div className='sidebar'>
        {
          aToken && <ul>
            <Nav.Link
              href="/admin-dashboard"
              className="d-flex gap-3"
              active={location.pathname === "/admin-dashboard"} // React Bootstrap way
            >
              <img src={assets.home_icon} alt="" />
              <p className="mt-3">Dashboard</p>
            </Nav.Link>
            <Nav.Link href="/all-appointments" className="d-flex gap-3"
              active={location.pathname === "/all-appointments"}>
              <img src={assets.appointment_icon} alt="" />
              <p className='mt-3'>Appointments</p>
            </Nav.Link>
            <Nav.Link href="/add-doctor" className="d-flex gap-3"
              active={location.pathname === "/add-doctor"}>
              <img src={assets.add_icon} alt="" />
              <p className='mt-3'>Add Doctor</p>
            </Nav.Link>
            <Nav.Link href="/doctor-list" className="d-flex gap-3"
              active={location.pathname === "/doctor-list"} >
              <img src={assets.people_icon} alt="" />
              <p className='mt-3'>Doctors List</p>
            </Nav.Link>
          </ul>
        }
        {

          dToken && <ul>
            <Nav.Link
              href="/doctor-dashboard"
              className="d-flex gap-3"
              active={location.pathname === "/doctor-dashboard"} // React Bootstrap way
            >
              <img src={assets.home_icon} alt="" />
              <p className="mt-3">Dashboard</p>
            </Nav.Link>
            <Nav.Link href="/doctor-appointments" className="d-flex gap-3"
              active={location.pathname === "/doctor-appointments"}>
              <img src={assets.appointment_icon} alt="" />
              <p className='mt-3'>Appointments</p>
            </Nav.Link>

            <Nav.Link href="/doctor-profile" className="d-flex gap-3"
              active={location.pathname === "/doctor-profile"} >
              <img src={assets.people_icon} alt="" />
              <p className='mt-3'>Profile</p>
            </Nav.Link>
          </ul>
        }
      </div>
    </>
  );
}

export default Sidebar;
