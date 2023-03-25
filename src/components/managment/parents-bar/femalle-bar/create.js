import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import HeaderManagment from "../../../parts/header/index-managment";
function CreateFemalle() {
    const [dateNaissance,setDateNaissance]=useState("")
    const [isWait,setIsWait]=useState(true)
    const [message,setMessage]=useState(true)
    const [race,setRace]=useState('Gaint Flander')
    const [cage,setCage]=useState('')
    const [img,setImg]=useState('')

    function sendData(event){
      event.preventDefault()
      setIsWait(false)
      var malle = new FormData()
      malle.append('file', img )
      malle.append('race',race)
      malle.append('date_naissance',dateNaissance)
  
      fetch("https://kossay.pythonanywhere.com/manager/api/femalles",{
      method:'post',
      headers: {
      'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
      },
      body:malle
      },
      )
      .then(response =>{
        
      if (response.status==201){
          return true
      }else if(response.status==500){
        return response.json()
      }else{
        return response.json()
      }
      })
      .then(data =>{
        if (data === true){
          window.location.href='/managment/manager/femalles' 
        }else {
          setIsWait(true)
          document.getElementById('message').style.display='block';
          setMessage(data)
      }
      })
      
    
    
    }
    function Races  ()  {
        const options=[
            {label:'Gaint Flander',value:'Gaint Flander'},
            {label:'Flemish Giant',value:'Flemish Giant'},
            {label:'Chinchilla',value:'Chinchilla'},
            {label:'New Zealand White',value:'New Zealand White'},
            {label:'California',value:'California'},
            {label:'Rex',value:'Rex'},

    ]
        return (
            <select value={race} onChange={e => setRace(e.target.value)} className="border border-success bg-success bg-opacity-25 rounded">
              {options.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
              
            </select>
        );
    };
    /// function to prpose a cage for a the rabbit
    useEffect(()=>{
      fetch("https://kossay.pythonanywhere.com/manager/api/femalle/cage_vide",{
          method:'get',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
          },},
          )
          .then(response =>{
          if (response.status==200){
              return response.json()
          }else{
          return false
          }
          })
          .then(data =>{
          if (data === false){
               window.location.href="/managment/manager/femalles"
          }else { 
              setCage(data.cage_vide)
          }
          })
    },[])
    
    
    return(
        <div>
          <HeaderManagment></HeaderManagment>
     
          <form onSubmit={sendData}>
            <div className="mt-2 mb-2 row card bg-success bg-opacity-50 p-1 col-12 col-sm-6 m-auto">
              <h4 className="text-dark">إضافة أنثى</h4>
              <h4 id="message" style={{display:"none"}} className="alert alert-danger">{message}</h4>
          
          <label>:القفص (لا يمكن تغييره)</label>
          <input disabled className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} value={cage} />

          <label>:تاريخ الولادة *</label>
          <input onChange={e => setDateNaissance(e.target.value)} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="date" />

          <label >:السلالة *</label>
          <Races/>
          <br></br>
          <input onChange={e => setImg(e.target.files[0])} className="border border-success bg-success bg-opacity-25 " style={{borderRadius:5+'px',}} type="file" />

          <Link to='/managment/manager/femalles/create/production'  className="col-11 mt-2 mb-2  m-auto alert alert-success">إضافة أنثى من خلال أرانب الإنتاج</Link>

          <div className="row justify-content-around mt-2 col-12 m-auto"> 
            {isWait ? 
              <button type="submit" className="col-5 m-1 btn btn-success">إضافة</button>
              :
              <button  className="col-5 m-1 btn btn-success" disabled>
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only"></span>
                </div>
              </button>
            }
            <Link to='/managment/manager/femalles'  className="col-5 m-1 btn btn-danger">إلغاء</Link>
          </div>
            </div>
          </form>

        </div>
      
    );
}
export default CreateFemalle