import React from 'react'
import { useContext } from 'react'
import { MyContext } from '../context/context'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import "./css/profile.css"
import CustomModal from '../components/CustomModal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
export default function Profile() {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const{Host,token,formatDate}=useContext(MyContext);
    let[Data,setData]=useState()
    useEffect(()=>{
        getData();
    },[])

    async function getData(){
        try {
            let res=await axios.get(`${Host}/api/team`,{
                headers:{
                    token:token
                }
            })
            setData(res.data.data);
        } catch (error) {
            console.log(error)
        }
    }
      async function handleChangePassword(values, { setSubmitting }) {
        try {
            let res = await axios.patch(`${Host}/api/team/changePassword`, {
                currentpassword: values.currentPassword,
                password: values.newPassword
            }, {
                headers: {
                    token: token
                }
            });

             toast.success("Password changed successfully", {
                    position: "top-center",
                    autoClose:3000,
                    hideProgressBar: true,
                    pauseOnHover: false,
                    draggable: true
                });
            
        } catch (error) {
            console.error(error);
            if (error.response?.data.message === "Incorrect currunt Password") {
                  toast.error("Incorrect Current Password", {
                    position: "top-center",
                    autoClose:3000,
                    hideProgressBar: false,
                    pauseOnHover: false,
                    draggable: true
                });
            } else {
                toast.error("Error changing password");
            }
        } finally {
            setSubmitting(false);
            setIsPasswordModalOpen(false);
        }
    }
    const passwordValidationSchema = Yup.object({
        currentPassword: Yup.string().required('Current Password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must not exceed 20 characters')
            .required('New Password is required'),
        reNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Re-enter New Password is required')
    });
  return (
    <div>
        <ToastContainer/>
      {Data?<div className="contData">
      <h2> Profile Page  </h2>
      <hr />
        <h3>  Name : {Data.name} </h3>
        <h3>  Email : {Data.email} </h3>
        <h3>  type : {Data.type?"Group Team":"Individual"} </h3>
        {Data.type?<div>
        <h5> Team Count Members :{ Data.teamCount} </h5>
        <p> Members:   {Data.members.map((member)=>
            <span>
                 {" "+member+" , "} 
            </span>,
            )} </p>
           </div>:""}


        <p> Join At :{formatDate(Data.createdAt)} </p>

            <Link to="/updateData" className=' mt-4 btn btn-primary me-3' > Update Profile Data  </Link>
            <button onClick={() => setIsPasswordModalOpen(true)} className=' mt-4 btn btn-primary me-3' > change  Password  </button>
      </div>
      :<Loading/>}

        <CustomModal className="w-100" isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)}>
                <div className="modal-content w-100">
                    <div className="modal-header">
                        <h5  className="modal-title">Change Password</h5>
                    </div>
                    <hr />
                    <Formik
                        initialValues={{ currentPassword: '', newPassword: '', reNewPassword: '' }}
                        validationSchema={passwordValidationSchema}
                        onSubmit={handleChangePassword}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                    <Field
                                        type="password"
                                        name="currentPassword"
                                        className={`form-control ${touched.currentPassword && errors.currentPassword ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="currentPassword" component="div" className="invalid-feedback" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <Field
                                        type="password"
                                        name="newPassword"
                                        className={`form-control ${touched.newPassword && errors.newPassword ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="reNewPassword" className="form-label">Re-enter New Password</label>
                                    <Field
                                        type="password"
                                        name="reNewPassword"
                                        className={`form-control ${touched.reNewPassword && errors.reNewPassword ? 'is-invalid' : ''}`}
                                    />
                                    <ErrorMessage name="reNewPassword" component="div" className="invalid-feedback" />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setIsPasswordModalOpen(false)}>Close</button>
                                    <button type="submit" className="btn btn-primary ms-2" disabled={isSubmitting}>Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </CustomModal>
    </div>
  )
}
