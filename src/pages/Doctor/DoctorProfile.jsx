import React, { useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from 'axios';
import {toast} from 'react-toastify'
const DoctorProfiles = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl  } = useContext(DoctorContext);
    const { currency} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false);

    const UpdateProfile = async ()=>{

        try {

            const updateData = {
                address:profileData.address,
                fees:profileData.fees,
                available:profileData.available
            }
 
            const {data} = await axios.post(backendUrl +'/api/doctor/update-profile',updateData,{headers:{dToken}});
            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }
    }

    useEffect(() => {
        getProfileData()
    }, [dToken])

    return profileData && (
        <>
            <Container className="mt-4">
                <Card className="shadow-lg p-4">
                    <Row className="align-items-center">
                        {/* Doctor Image */}
                        <Col md={4} className="text-center">
                            <img
                                src={profileData.image}
                                alt={profileData.name}
                                className="img-fluid rounded-circle border border-secondary"
                                style={{ width: "150px", height: "150px", objectFit: "cover", backgroundColor: '#5f6fff' }}
                            />
                        </Col>

                        {/* Doctor Info */}
                        <Col md={8}>
                            <h4 className="fw-bold">{profileData.name}</h4>
                            <p className="text-muted">
                                {profileData.degree} - {profileData.speciality}
                            </p>
                            <Button variant="info" className="me-3">
                                {profileData.experience} Years Experience
                            </Button>
                        </Col>
                    </Row>

                    <hr />

                    {/* About Section */}
                    <h5 className="fw-bold">About</h5>
                    <p className="text-muted">{profileData.about}</p>

                    {/* Fee */}
                    <p className="fw-bold">
                        Appointment Fee: <span className="text-success">{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))} value={profileData.fees}></input> : profileData.fees}</span>
                    </p>

                    {/* Address Section */}
                    <div className="mt-3">
                        <h6 className="fw-bold">Address:</h6>
                        <p className="text-muted mb-1">
                            {isEdit ? (
                                <input
                                    type="text"
                                    onChange={(e) => setProfileData((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, line1: e.target.value } // Updating only `line1` inside `address`
                                    }))}
                                    value={profileData.address.line1}
                                />
                            ) : (
                                profileData.address.line1
                            )}
                        </p>
                        <p className="text-muted">
                            {isEdit ? (
                                <input
                                    type="text"
                                    onChange={(e) => setProfileData((prev) => ({
                                        ...prev,
                                        address: { ...prev.address, line2: e.target.value } // Updating `line2`
                                    }))}
                                    value={profileData.address.line2}
                                />
                            ) : (
                                profileData.address.line2
                            )}
                        </p>
                    </div>


                    {/* Availability Checkbox */}
                    <Form.Group className="mt-3 d-flex align-items-center">
                        <Form.Check type="checkbox" className="me-2" checked={profileData.available} onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} />
                        <Form.Label className="fw-bold mt-2">Available</Form.Label>
                    </Form.Group>

                    {/* Edit Button */}

                    {
                        isEdit ? <Button variant="primary" className="mt-3" onClick={UpdateProfile}>Save</Button>
                            : <Button variant="primary" className="mt-3" onClick={() => setIsEdit(true)}>Edit</Button>
                    }

                </Card>
            </Container>
        </>
    );
}

export default DoctorProfiles;
