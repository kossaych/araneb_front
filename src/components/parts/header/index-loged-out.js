import React from "react";
import logo from "../../../assets/icons/logo.png"
import home from "../../../assets/icons/home.png"
import { Link} from "react-router-dom";
import about from "../../../assets/icons/about.png"
import login from "../../../assets/icons/login.png"
import register from "../../../assets/icons/register.png"
import contact from "../../../assets/icons/contact.png"
function HeaderLogOut(){
    const iconStyle={width:"25px", margin:"5px"}
    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-opacity-50">
        <div className="container px-5">
            <Link className="navbar-brand" to="/"><img style={{width:50+'px'}} src={logo} alt="logo" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link text-dark" to='/' ><img className="icon" style={iconStyle} src={home}/>Home</Link></li>
                <li className="nav-item"><Link className="nav-link text-dark" to='/about' ><img className="icon" style={iconStyle} src={about}/>About</Link></li>
                <li className="nav-item"><Link className="nav-link text-dark" to='/contact' ><img className="icon" style={iconStyle} src={contact}/>Contact</Link></li>
                <li className="nav-item"><Link className="nav-link text-dark" to='/login' ><img className="icon" style={iconStyle} src={login}/>Login</Link></li>
                <li className="nav-item"><Link className="nav-link text-dark" to='/register'><img className="icon" style={iconStyle} src={register}/>SignUp</Link></li>
                </ul>
            </div>
        </div>
    </nav>

    )
}
export default HeaderLogOut