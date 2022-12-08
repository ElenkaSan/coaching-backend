import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

import Homepage from "../homepage/Homepage"
import AboutUs from "./AboutUs"
import Programs from "./Programs"
import Business from "./Business"
import Publications from "./Publications"
import Contact from "./Contact"

import SignupForm from "../auth/SignupForm"
import LoginForm from "../auth/LoginForm"
import ProfileForm from "../auth/ProfileForm"
import UserPage from "../auth/UserPage"
import UserContext from "../auth/UserContext"

// React Router will help navigate different routes for the vacation time app
// based on whether the user is logged in or not. 
// This will prevent users from access unauthorized paths. 

  const RoutesWeb = ({ login, signup, updateUser }) => {

  const { isLoggedIn } = useContext(UserContext);

  console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
  );

  return (
      <div className="pt-5">
        <Routes>
        {isLoggedIn
                ? (<>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/company">
            <AboutUs />
          </Route>
         <Route exact path="/programs">
             <Programs />
          </Route>
          <Route exact path="/business">
             <Business />
          </Route>
          <Route exact path="/publications">
             <Publications />
          </Route>
          <Route exact path="/contact">
             <Contact />
          </Route>
          <Route path="/profile">
            <UserPage />
          </Route>
          <Route path="/update">
              <ProfileForm updateUser={updateUser} />
            </Route>
            <Route path="/" element={<Navigate replace to="/" />} />
          {/* <Navigate to="/" />  */}
          {/* <Navigate to="/404" /> */}
          </>) : (<>
            <Route exact path="/company">
            <AboutUs />
          </Route>
         <Route exact path="/programs">
             <Programs />
          </Route>
          <Route exact path="/business">
             <Business />
          </Route>
          <Route exact path="/publications">
             <Publications />
          </Route>
          <Route exact path="/contact">
             <Contact />
          </Route>
          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>
          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/" element={<Navigate replace to="/" />} />
          {/* <Navigate to="/404" /> */}
          {/* <Redirect to="/" /> */}
          </>)
            }
        </Routes>
      </div>
  );
}

export default RoutesWeb;
