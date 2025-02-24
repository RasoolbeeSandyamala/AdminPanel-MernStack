import React, { useContext , useState} from 'react';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import DoctorList from './pages/Admin/DoctorList';
import AddDoctors from './pages/Admin/AddDoctor';
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorDashboards from './pages/Doctor/DoctorDashboard';
import DoctorProfiles from './pages/Doctor/DoctorProfile';
const App = () => {

   const {aToken} = useContext(AdminContext)
   const {dToken} = useContext(DoctorContext)

   const [isDarkTheme, setIsDarkTheme] = useState(false);

   // Function to toggle theme
   const toggleTheme = () => {
     setIsDarkTheme((prevTheme) => !prevTheme);
   };

  return aToken || dToken ? (
    
      <div className={`app-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
       
        <ToastContainer />
        <Navbar />
        <div className='app'>
          <Sidebar />
          <div className="content container">
          <Routes>
            {/* Admin Route */}
            <Route path='/' element={<></>} />
            <Route path='/admin-dashboard' element={<Dashboard /> } />
            <Route path='/all-appointments' element={<AllAppointments /> } />
            <Route path='/add-doctor' element={<AddDoctors /> } />
            <Route path='/doctor-list' element={<DoctorList /> } />

            {/* Doctor Route */}
            <Route path='/doctor-dashboard' element={<DoctorDashboards /> } />
            <Route path='/doctor-appointments' element={<DoctorAppointment /> } />
            <Route path='/doctor-profile' element={<DoctorProfiles /> } />
          </Routes>
          </div>
        </div>
        <div className='text-center d-flex align-items-center justify-content-center container mt-3 mb-5'><button className="theme-toggle-btn " onClick={toggleTheme}>
        {isDarkTheme ? "Light Mode" : "Dark Mode"}
      </button></div>
        
      </div>
  
  ) : (
       <>
          <Login />
          <ToastContainer />
       </>
  )
}

export default App;
