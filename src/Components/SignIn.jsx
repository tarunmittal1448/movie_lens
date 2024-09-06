import React, { useState } from "react";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { auth,provider } from "../firebase";
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [userCredentials,setUserCredentials]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()
    const [submitDisabled,setSubmitDisabled]=useState(false)
    const handleOnChange=(e)=>{
        setUserCredentials({
            ...userCredentials,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(userCredentials.email==='' || userCredentials.password===''){
            toast.error("Please fill all the fields");
            return;
        }
        setSubmitDisabled(true)
        try {
            // await setPersistence(auth,browserLocalPersistence);
            const response = await signInWithEmailAndPassword(auth,userCredentials.email,userCredentials.password);
            const user=response.user;
            // console.log(user);
            setSubmitDisabled(false)
            if(!user.emailVerified){
                toast.error("Email not verified");
                return;
            }
            toast.success(`Welcome ${user.displayName}`)
            navigate("/");
            
        } catch (error) {
            toast.error(error.message)
            setSubmitDisabled(false)
        }
    }
    const singUpGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // console.log(user)
          toast.success(`Welcome ${user.displayName}`)
          navigate("/");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.error(error.message);
          // ...
    });
    }
  return (
    <div className="flex mt-32 justify-center items-center px-5">
        <ToastContainer theme="colored" />
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div className="alternate-auth-methods flex justify-between">
            <button
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
              onClick={singUpGoogle}
            >
              <svg
                className="w-4 h-4 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
          <div className="divide-line h-5 flex items-center">
            <div className="h-[0.10rem] w-[42%] bg-[#374151] inline-block"></div>
            <span className="mx-4"> or </span>
            <div className="h-[0.10rem] w-[42%] bg-[#374151] inline-block"></div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              value={userCredentials.email}
              onChange={handleOnChange}
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="abc@gmail.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              value={userCredentials.password}
              onChange={handleOnChange}
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="">
            <Link
              to="/SignIn/ForgotPassword"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Login to your account
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
  );
};

export default SignIn;
