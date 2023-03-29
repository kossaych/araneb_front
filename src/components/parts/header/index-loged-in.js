import React from "react";
// import images
import logo from "./icons/logo.png"

import home from "./icons/home.png"
import logoutimg from "./icons/logout.png"
import user from "./icons/user.png"
import parent from "../../icons/parent.png"
import statistique from "../../icons/statistique-2.png"
import production from "../../icons/production.png"
import acouplement from "../..//icons/acouplement.png"

// end import images
import { Link} from "react-router-dom";



function HeaderLogIn(){
    function logout(){
        localStorage.removeItem('token');
        window.location.reload();
        window.location.href='/'
    }
    const iconStyle={width:"25px", margin:"5px"}
 
    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-success bg-opacity-50">
        <div className="container px-5">
            <Link className="navbar-brand" to="/"><img style={{width:50+'px'}} src={logo} alt="logo" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link text-dark" aria-current="page" to="/"><img style={iconStyle} src={home} />Home</Link></li>

                        <li className="nav-item"><Link className="nav-link  text-dark" to="/managment/manager/parents"><img style={iconStyle} src={parent}/><span className="text-dark">parents</span></Link></li>
                        <li className="nav-item"><Link className="nav-link  text-dark" to="/managment/production"><img style={iconStyle} src={production}/>production</Link></li>
                        <li className="nav-item"><Link className="nav-link  text-dark" to="/managment/acouplement"><img style={iconStyle} src={acouplement}/>acouplement</Link></li>
                        <li className="nav-item"><Link className="nav-link  text-dark" to="/managment/statistique"><img style={iconStyle} src={statistique}/>statistiques</Link></li>


                        <li className="nav-item"><Link className="nav-link  text-dark" to="profil"><img style={iconStyle} src={user} />kossay</Link></li>
                        <li className="nav-item nav-link  text-dark" onClick={logout}><img style={iconStyle} src={logoutimg} />logout</li>
                </ul>
            </div>
        </div>
    </nav>
 


    )
}
export default HeaderLogIn
