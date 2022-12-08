import React, { useContext } from "react";
// import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import "./Homepage.css";
import UserContext from "../auth/UserContext";
import NoLoggedIn from "./NoLoggedIn";
// import { FaGithubAlt } from "react-icons/fa";
// import { AiFillLinkedin } from "react-icons/ai";
// import { TiWeatherPartlySunny } from "react-icons/ti";

// Home component is the splash page for the app. 
// It will render a login/signup elements if the user is not logged.
// It will render User profile page and Trip page elements if the user is logged id.
// This also the default for any redirects and broken links

const Homepage = () => {
  const { isLoggedIn } = useContext(UserContext);
  console.debug("Homepage", "isLoggedIn=", isLoggedIn);


return (
  <section className="container">
    <Card className="J card text-center">
      <CardBody className="text-center">
        {/* {isLoggedIn
          ? (<>         
            <CardTitle>
              <h2 className="T text-info font-weight-bold"> {`Welcome ${isLoggedIn.username}!`} </h2>
              <hr />
            </CardTitle>
            <CardText>
              <div className="card bg-light p-2">
                <h5 className=""> 
                 Couch Website Loggin user
                </h5>
              </div>
            </CardText>
          </>) : (<>  */}
            <CardTitle>
              <h2 className="T font-weight-bold font-italic text-light">
                Welcome to Couch Anna Rubleva!
              </h2>
            </CardTitle>
                      <CardText>
                      <NoLoggedIn />
                      </CardText>
            {/* </>) }  */}
      </CardBody>
    </Card>
    {/* <div className="footer">
    </div> */}
  </section>
)
}

export default Homepage;
