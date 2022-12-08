import React from "react";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from 'reactstrap';
// import { FaSignInAlt } from "react-icons/fa";
// import { MdSwitchAccount } from "react-icons/md";

//Use in Homepage component for login or signup user
function NoLoggedIn() {
    let navigate = useNavigate();
    return (
        <ButtonGroup>
            <Button className='btn btn-m' style={{ color: '#bfe64b' }}onClick={evt => {navigate('/signup')}} type="Signup">
            Signup 
                {/* <h4><MdSwitchAccount /> </h4>  */}
                 </Button>
            <Button className='btn btn-m' style={{ color: '#bfe64b' }} onClick={evt => {navigate('/login')}} type="Login"> 
            Login
            {/* <h4> <FaSignInAlt /></h4>  */}
            </Button>
        </ButtonGroup>
    )
}

export default NoLoggedIn;