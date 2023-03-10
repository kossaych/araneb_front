import React from "react";
import facebook from "./icons/facebook.png"
import instagram from "./icons/instagram.png"
import githup from "./icons/githup.png"
import logo from "./icons/logo.png"
import linkedin from "./icons/linkedin.png"
import website from "./icons/website.png"
import flaticon from "./icons/flaticon.png"
function Footer(){
    return(
        <footer className="text-center text-dark bg-success bg-opacity-50" >
        <div className="container pt-4 ">
         
          <section className="mb-4 ">
            <span className="text-dark">
              all icons used in this website are imported from <br></br>
              <a href="https://www.flaticon.com/" className="text-dark">
                     flaticon.com
                <img alt="flaticon" className="icon" style={{width:20 +"px" ,margin:2 +"px"}} src={flaticon}/>
            </a>
            </span>
            <br/>
            <span className="text-dark">developer: this website developed by kossay chemingui</span>
          </section>
         
        </div>
    
      
       
        <div className="text-center  p-3" style={{backgroundColor:"white"}}>
          © 2022 Copyright: araneb     

        <img alt="logo" className="icon" style={{width:50 +"px" ,margin:2 +"px"}} src={logo} />
        </div>

        </footer>
    
    )
}
export default Footer