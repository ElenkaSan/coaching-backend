import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Header from "./components/Header";
import RoutesWeb from "./components/Routes";

import LoadingSpinner from "./common/LoadingSpinner";
import Api from "./api";
import UserContext from "./auth/UserContext";
import jwt from "jsonwebtoken";
require("dotenv").config();


// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "couch-token";

// App script provides the initial rendering of children components. 
// Uopon initial rendering, we check to see if the user has a token in the browser session.
// We decrypt the token and use the data to rerender the user's session.
// If not, we ask the user to login or signup and cannot proceed until one of these actions is completed. 
// Upon successful login/signup, user data will be saved to global variable of "USER"
// If not successful, we will send back the errors for it to be displayed on child component.

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=",
    infoLoaded,
    "isLoggedIn=",
    isLoggedIn,
    "token=",
    token
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.
  //On load: if token exists in local storage, persist on site.
  //--get token, decrypt it, and then save data to USER state.
  // If error, send back errors to the console..

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getUserProfile() {
        if (token) {
          try {
            let { username } = jwt.decode(token);
            Api.token = token;
            let isLoggedIn = await Api.getUserProfile(username);
            setIsLoggedIn(isLoggedIn);
            setApplicationIds(new Set(isLoggedIn.applications));
          } catch (err) {
            console.error(err);
            setIsLoggedIn(null);
          }
        }
        setInfoLoaded(true);
      }
      setInfoLoaded(false);
      getUserProfile();
    },
    [token]
  );

   //We register users with this function to Api, which posts to the backend.
  //If successful, save USER with data, save new token, and return success message. 
  //IF unsucessful, return errors. 
  const signup = async (signupData) => {
    try {
      let token = await Api.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err };
    }
  };

   //Login User gives the user the ability to login. Data is checked on APi to the backend.
  //If successful, save USER with data, save new token, and return success message. 
  //IF unsucessful, return errors. 
  const login = async (loginData) => {
    try {
      let token = await Api.login(loginData);
      setToken(token);
      console.error(token);
      return [true, token.message ];
    } catch (err)
     {
      console.error(err);
      return [false, err.message];
    }
  };


  //Logout will reset the session token to null for the user and will remove their data from the app instance.
  const logout = () => {
    setIsLoggedIn(null);
    setToken(null);
    // localStorage.clear();
  };

 //Users can update their profile with this function, which posts to the back end on Api call.
  //If successful, save USER with data and return success message. 
  //IF unsucessful, return errors. 
  async function updateCurrentUser() {
    try {
      let token = await Api.getUserProfile(isLoggedIn.username);
      setApplicationIds(new Set(isLoggedIn.applications));
      updateUser(token);
      return { success: true };
    } catch (err) {
      console.error(err);
      setIsLoggedIn(null);
      return [false, err.message];
    }
  }

  const updateUser = (newUser) => {
    setIsLoggedIn(newUser);
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          isLoggedIn,
          updateUser,
          setIsLoggedIn,
          updateCurrentUser,
          applicationIds
        }}
      >
        <div>
          <Header logout={logout} />
          <RoutesWeb login={login} signup={signup} 
          />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
