import { useEffect, useState } from "react";
import Header from "./Components/Header";
import MovieHome from "./Components/MovieHome";
import SearchBar from "./Components/SearchBar";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ForgotPassword from "./Components/ForgotPassword";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAuthMethod = (user) => {
    // Check the providerData to determine the authentication method
    const providerData = user.providerData;

    if (providerData && providerData.length > 0) {
      const authProvider = providerData[0].providerId;

      if (authProvider === "password") {
        return "password";
      } else if (authProvider === "google.com") {
        return "Google";
      } else {
        return "Other Provider";
      }
    }
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user is logged in");
      // console.log(user);
      const authMethod = getAuthMethod(user);
      if (authMethod === "password" && !user.emailVerified) {
        logOut();
        return;
      }
      setCurrentUser(user);
    } else {
      // User is signed out
      // ...
      console.log("user is signed out");
      setCurrentUser(user);
    }
  });

  return (
    <BrowserRouter>
      <div className="dark:bg-black dark:text-white">
        <Header currentUser={currentUser} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <MovieHome currentUser={currentUser} />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <SearchBar />
                <MovieHome currentUser={currentUser} />
              </>
            }
          />
          <Route
            path="/favourites"
            element={<MovieHome currentUser={currentUser} />}
          />
          <Route
            path="/watchlist"
            element={<MovieHome currentUser={currentUser} />}
          />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
