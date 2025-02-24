import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctors = ({ isDarkTheme }) => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image not selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // Log formData
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setEmail('');
        setPassword('');
        setDegree('');
        setFees('');
        setAbout('');
        setAddress1('');
        setAddress2('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={`add-doctor-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <form onSubmit={onSubmitHandler}>
        <p className='fw-bold mb-3 fs-3 ms-3 text-primary'>Add Doctor</p>
        <div className='p-3 rounded-4 bg-light border m-auto border-secondary'>
          <div className='d-flex gap-3 '>
            <label htmlFor="doc_img">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload"
                style={{ width: '45px', border: '1px solid black', borderRadius: '50%', color: 'black' }}
              />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc_img' hidden />
            <p>Upload doctor <br /> picture</p>
          </div>

          <div className='d-flex gap-5 p-2 mb-2'>
            <div>
              <p className='mt-3 mb-1 ms-1'>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' className='form-control' required />

              <p className='mt-3 mb-1 ms-1'>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' required className='form-control' />

              <p className='mt-3 mb-1 ms-1'>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='form-control' required />

              <p className='mt-3 mb-1 ms-1'>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='form-control'>
                {[...Array(10).keys()].map((year) => (
                  <option key={year} value={`${year + 1} Year`}>{year + 1} Year</option>
                ))}
              </select>

              <p className='mt-3 mb-1 ms-1'>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='Fees' className='form-control' required />
            </div>

            <div>
              <p className='mt-3 mb-1 ms-1'>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='form-control'>
                {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>

              <p className='mt-3 mb-1 ms-1'>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='Education' className='form-control' required />

              <p className='mt-3 mb-1 ms-1'>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder='Address 1' className='form-control mt-3 mb-3' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder='Address 2' className='form-control' required />
            </div>
          </div>

          <p className='ms-2 mb-2'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} placeholder='Write about doctor' rows={5} required className='form-control ms-1' />

          <button type='submit' className='btn btn-primary mt-3 ms-2 rounded-5'>Add Doctor</button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctors;
