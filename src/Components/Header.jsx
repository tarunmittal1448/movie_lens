import React, { useEffect, useState } from "react";
import moon from "../assets/moon-solid.svg";
import sun from "../assets/white-sun.svg";
import useDarkSide from "./useDarkSide";
import 'flowbite';
import ourLogo from "../assets/lens-logo.png"
import { useDispatch } from "react-redux";
import { addCategory, clearCategory } from "../Features/categoryFilterReducer";
import { addLanguage, clearLanguage } from "../Features/languageFilterReducer";
import { useNavigate } from "react-router-dom";
import { genres, languages } from "../Data/filterId";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "boxicons";
// import { auth } from "../firebase";
const Header = ({ currentUser }) => {
  const [currentUserState, setCurrentUser] = useState(currentUser);
  // const dropdownRef = useRef(null);
  const logOut = async () => {
    // // console.log("log out is clicked")
    try {
      await signOut(auth);
      // // console.log("Signed out")
      setCurrentUser(null);
      navigate("/")
      toast.success("User logged out");
    } catch (error) {
      // console.log(error.message);
    }
  };
  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser]);
  const [colorTheme, setTheme] = useDarkSide();
  const toggleMode = () => {
    setTheme(colorTheme);
  };
  // console.log(currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addCategoryFunc = (e) => {
    dispatch(addCategory(genres[e.target.value]));
    const btn = document.getElementById("categoryDropdownNavbarLink");
    btn.click();
    const btn2 = document.getElementById("mobile-navbar-toggle");
    btn2.click();
    navigate("/");
  };
  const addLanguageFunc = (e) => {
    dispatch(addLanguage(languages[e.target.value]));
    const btn = document.getElementById("languageDropdownNavbarLink");
    btn.click();
    const btn2 = document.getElementById("mobile-navbar-toggle");
    btn2.click();
    navigate("/");
  };
  const popular = () => {
    dispatch(clearCategory());
    dispatch(clearLanguage());
    navigate("/");
  };

  const handleDocumentClick=()=>{
    const categoryDropdown=document.getElementById('categoryDropdownNavbar');
    if(!categoryDropdown.classList.contains('hidden')){
      categoryDropdown.classList.add('hidden');
    }
    const languageDropdown=document.getElementById('languageDropdownNavbar');
    if(!languageDropdown.classList.contains('hidden')){
      languageDropdown.classList.add('hidden');
    }
    const userDropdown=document.getElementById('user-dropdown');
    if(!userDropdown.classList.contains('hidden')){
      userDropdown.classList.add('hidden');
    }
  }
  const toggleUserMenu = (e) => {
    e.stopPropagation();
    const categoryDropdown=document.getElementById('categoryDropdownNavbar');
    if(!categoryDropdown.classList.contains('hidden')){
      categoryDropdown.classList.add('hidden');
    }
    const languageDropdown=document.getElementById('languageDropdownNavbar');
    if(!languageDropdown.classList.contains('hidden')){
      languageDropdown.classList.add('hidden');
    }
    // console.log("toggle function called");
    document.getElementById("user-dropdown").classList.toggle("hidden");
  };
  
  const toggleNavbar=(e)=>{
    
    const mobileNavbar = document.getElementById('navbar-sticky');
    // console.log(mobileNavbar);
    mobileNavbar.classList.toggle('hidden');
  }
  const toggleCategories=(e)=>{
    e.stopPropagation();
    const languageDropdown=document.getElementById('languageDropdownNavbar');
    if(!languageDropdown.classList.contains('hidden')){
      languageDropdown.classList.add('hidden');
    }
    const userDropdown=document.getElementById('user-dropdown');
    if(!userDropdown.classList.contains('hidden')){
      userDropdown.classList.add('hidden');
    } 
    document.getElementById('categoryDropdownNavbar').classList.toggle('hidden');
  }
  const toggleLanguages=(e)=>{
    e.stopPropagation();
    const userDropdown=document.getElementById('user-dropdown');
    if(!userDropdown.classList.contains('hidden')){
      userDropdown.classList.add('hidden');
    } 
    const categoryDropdown=document.getElementById('categoryDropdownNavbar');
    if(!categoryDropdown.classList.contains('hidden')){
      categoryDropdown.classList.add('hidden');
    }
    document.getElementById('languageDropdownNavbar').classList.toggle('hidden');
  }

  useEffect(() => {
    // Add a click event listener to the document
    document.addEventListener('click', handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  },[]);
  
  return (
    <>
      <nav className="bg-gray-100 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <ToastContainer theme="colored" />
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div href="#" className="flex items-center">
            <img src={ourLogo} onClick={popular} className="h-8 mr-3 cursor-pointer" alt="Movie Lens" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer" onClick={popular}>
              Movie Lens
            </span>
          </div>
          <div className="flex md:order-2 space-x-3 items-center">
          
          {('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) ? (
        <></>
      ) : (
        <Tooltip id="my-tooltip" />
      )}
      
            <button onClick={toggleMode}>
              <img
                className={`h-6 w-6 ${colorTheme === "light" ? "hidden" : ""}`}
                src={moon}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Toggle to dark Mode"
                alt=""
              />
              <img
                className={`h-6 w-6 ${colorTheme === "dark" ? "hidden" : ""}`}
                src={sun}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Toggle to light Mode"
                alt=""
              />
            </button>
            {/* {currentUserState === null ? ( */}
            {/* <> */}
            <button
              type="button"
              className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                currentUser !== null ? "hidden" : ""
              }`}
            >
              <Link to="/SignIn">Log In</Link>
            </button>
            <button
              type="button"
              className={`text-white hidden ${
                currentUser !== null ? "hidden" : "lg:block"
              } bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"`}
            >
              <Link to="/SignUp">Register</Link>
            </button>
            {/* </> */}
            {/* ) : ( */}
            <div
              id="user-dropdown-container"
              className={`${currentUser === null ? "hidden" : ""}`}
              
            >
              <button
                type="button"
                id="user-menu-button"
                aria-expanded="false"
                // data-dropdown-toggle="user-dropdown"
                // data-dropdown-placement="bottom"
                
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <div className="dark:hidden">
                  <box-icon name="user-circle"></box-icon>
                </div>
                <div className="hidden dark:block">
                  <box-icon name="user-circle" color="#FFFFFF"></box-icon>
                </div>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                className="z-50 hidden my-4 absolute right-4 top-8 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {currentUser!==null?currentUser.displayName:''}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {currentUser!==null?currentUser.email:''}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/favourites"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Favourites
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/watchlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Watchlist
                    </Link>
                  </li>
                  
                  <li>
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                      onClick={logOut}
                    >
                      Sign out
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            {/* )} */}

            <button
              // data-collapse-toggle="navbar-sticky"
              id="mobile-navbar-toggle"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer"
              onClick={toggleNavbar}
              // aria-controls="navbar-sticky"
              // aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <div
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                  onClick={popular}
                >
                  Popular Worldwide
                </div>
              </li>
              {/* category dropdown starts */}
              <li>
                <button
                  id="categoryDropdownNavbarLink"
                  // data-dropdown-toggle="categoryDropdownNavbar"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={toggleCategories}
                >
                  Categories
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="categoryDropdownNavbar"
                  className="z-10 absolute hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {genres.map((genre, index) => {
                      return (
                        <li
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                          value={index}
                          key={genre.id}
                          onClick={addCategoryFunc}
                        >
                          {genre.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>

              {/* category dropdown ends */}
              {/* langugae dropdown starts  */}
              <li>
                <button
                  id="languageDropdownNavbarLink"
                  // data-dropdown-toggle="languageDropdownNavbar"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={toggleLanguages}
                >
                  Original Language
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="languageDropdownNavbar"
                  className="z-10 hidden absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    {languages.map((language, index) => {
                      return (
                        <li
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                          value={index}
                          key={language.code}
                          onClick={addLanguageFunc}
                        >
                          {language.title}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              {/* language dropdown ends  */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
