import React from "react";
import HeaderLogIn from "../parts/header/index-loged-in";
import HeaderLogOut from "../parts/header/index-loged-out";
import { Link } from "react-router-dom";
import afiche from "./icons/afiche-2.jpg"
function Home(){
  


  function headerSet(){
    if(localStorage.getItem('token')){
    return (<HeaderLogIn></HeaderLogIn>)

  }
  return <HeaderLogOut></HeaderLogOut>
  }


  
return(
  <div>
  {headerSet()}
    <div className=" px-4 px-lg-5 ">
    <div className="row gx-4 gx-lg-5 align-items-center my-2">
        <div className="col-lg-7" ><img style={{border:"solid blue" +1+"px", borderRadius:360+'px'}}  className="img-fluid rounded mb-4 mb-lg-0 w-100" src="" alt="afiche" /></div>
        <div className="col-lg-5">
            <h1 className="font-weight-light">araneb</h1>
            <p>A website to help you manage your rabbit business</p>
            <Link className="btn btn-primary"  to={'/register'}>SignUp </Link>
        </div>
    </div>
    <div className=" alert alert-success text-success  my-5 py-4 text-center">
        <div className="card-body"><p className=" m-0 text-dark ">we are on amission to change your belafes about rabbits</p></div>
    </div>

</div>
</div>
)
}
export default Home