import React from 'react'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const ForgotPassword = () => {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [submitDisabled,setSubmitDisabled]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(email===""){
            toast.error("Email field cannot be empty");
            return;
        }
        try {
            await sendPasswordResetEmail(auth,email);
            Swal.fire(
                'Mail Sent',
                `Password reset email sent to ${email} reset password from there and login with your new password`,
                'success'
            )
            navigate("/SignIn");
            
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div>
      <div className="flex mt-32 justify-center items-center px-5">
        <ToastContainer theme="colored" />
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Forgot Password
          </h5>
          
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              
              required
            />
          </div>
          
          <div className="">
            <Link
              to="/SignIn"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Back to login page
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Send password reset email
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <Link
              to="/SignUp"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default ForgotPassword
