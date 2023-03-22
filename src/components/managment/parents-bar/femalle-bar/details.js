import React, { useEffect, useState } from 'react';
import HeaderManagment from '../../../parts/header/index-managment';

import mort from "./icons/mort.png"
import vent from "./icons/vent.png"
import production from "./icons/production2.png"
import alimentation from "./icons/alimentation.png"
import poids from './icons/poids.png';
import { useParams } from 'react-router-dom';
function FemalleDetails(){

    
    const [message,setMessage]=useState(true)
    
    const [TP,setTP]=useState(true)
    const [TM,setTM]=useState(true)
    const [TMN,setTMN]=useState(true)
    const [TPnet,setTPnet]=useState(true)
    
    const [TPf,setTPf]=useState(true)
    const [TMf,setTMf]=useState(true)
    const [TPnetf,setTPnetf]=useState(true)

    const [TPm,setTPm]=useState(true)
    const [TMm,setTMm]=useState(true)
    const [TPnetm,setTPnetm]=useState(true)

    const [TV,setTV]=useState(true)
    const [TVm,setTVm]=useState(true)
    const [TVf,setTVf]=useState(true)
    const [grandprix,setgrandprix]=useState(true)
    const [basprix,setbasprix]=useState(true)
    const [moyprix,setmoyprix]=useState(true)
    
    const [MPN,setMPN]=useState(true)
    const [MPS,setMPS]=useState(true)
    const [TOPPS,setTOPPS]=useState(true)
    const [BASPS,setBASPS]=useState(true)
    const [TOPPN,setTOPPN]=useState(true)
    const [BASPN,setBASPN]=useState(true)
    
    const [cons,setcons]=useState(true)
    const [Mcons,setMcons]=useState(true)

    
  
  
  
    const {id}=useParams()
    const {cage}=useParams()

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/manager/api/femalle/"+id,{
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
                setTP(data.info.TP)
                setTM(data.info.TM)
                setTMN(data.info.TMN)
                setTPnet(data.info.TPnet)
                
                setTPf(data.info.TPf)
                setTMf(data.info.TMf)
                setTPnetf(data.info.TPnetf)
            
                setTPm(data.info.TPm)
                setTMm(data.info.TMm)
                setTPnetm(data.info.TPnetm)
            
                setTV(data.info.TV)
                setTVm(data.info.TVm)
                setTVf(data.info.TVf)
                setgrandprix(data.info.grandprix)
                setbasprix(data.info.basprix)
                setmoyprix(data.info.moyprix)
                
                setMPN(data.info.MPN)
                setMPS(data.info.MPS)
                setTOPPS(data.info.TOPPS)
                setBASPS(data.info.BASPS)
                setTOPPN(data.info.TOPPN)
                setBASPN(data.info.BASPN)
                
                setcons(data.info.cons)
                setMcons(data.info.Mcons)

                
              
            }
            })
    },[])
    let PCons
    if (cons == 0 ){
         PCons=0
    }else{
            PCons=((cons/((cons/Mcons)*250))*100)+((TP/8)*100)
         }
     


    return( 
    <div className='bg-primary bg-opacity-25'>
    <HeaderManagment/>
    <div className='m-1 row justify-content-around'>
        <h4>les statistique de prodectivité de femalle ce mois :</h4>
        
        <div>la production par rapport à la consommation :</div>
        <div className='alert alert-primary col-10 m-2 col-sm-10 col-md-10'>{100-PCons+((TP/8)*100)}%</div>
        <div>les mortalité par rapport à la consommation :</div>
        <div className='alert alert-danger col-10 m-2 col-sm-10 col-md-10'>{100-PCons+((TM/2)*100)}%</div>
        <div>les poid des lapins produits par rapport à la consommation :</div>
        <div className='alert alert-primary col-10 m-2 col-sm-10 col-md-10'>{100-PCons+((((MPN/30)*100)+((MPS/130)*100)))/2}%</div>

        <div className="col-12 col-sm-6 col-md-3 mt-3">
            <div className="card l-bg-cherry">
                <div className="card-statistic-3 p-2">
                    <div className="card-icon card-icon-large"><img style={{"width":150+"px","height":100+"px"}} src={alimentation}   ></img></div>
                    <div className="mb-12">
                        <h5 className="card-title mb-0">les statistiques d'alimentation de femalle</h5>
                    </div>
                    <div className="row align-items-center mb-1 d-flex">
                        <div className="col-12">
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">la consomation d'alimentation aujourd'hui</span>
                                <span className="col-6">15</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">la consomation d'alimentation ce mois</span>
                                <span className="col-6">{cons}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">coup la consomation d'alimentation ce mois</span>
                                <span className="col-6">{cons*100}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                           
                        </div>
                        
                    </div>
                   
                </div>
            </div>

        </div>
        <div className="col-12 col-sm-6 col-md-3 mt-3">
            <div className="card bg-opacity-75 bg-danger">
                <div className="card-statistic-3 p-2">
                    <div className="card-icon card-icon-large"><img style={{"width":150+"px","height":100+"px"}} src={mort}   ></img></div>
                    <div className="mb-12">
                        <h5 className="card-title mb-0">mortalité</h5>
                    </div>
                    <div className="row align-items-center mb-1 d-flex">
                        <div className="col-12">
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité</span>
                                <span className="col-6">{TM}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité de lapins de sex inconue</span>
                                <span className="col-6">{TM-(TMm+TMf)}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité des malles</span>
                                <span className="col-6">{TMm}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité des femalles</span>
                                <span className="col-6">{TMf}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                        </div>
                        
                    </div>
                   
                </div>
         </div>

        </div>

        <div className="col-12 col-sm-6 col-md-3 mt-3">
            <div className="card bg-opacity-75 bg-success">
                <div className="card-statistic-3 p-2">
                    <div className="card-icon card-icon-large"><img style={{"width":150+"px","height":100+"px"}} src={production}   ></img></div>
                    <div className="mb-12">
                        <h5 className="card-title mb-0">les statistiques des mortalité des lapins produits</h5>
                    </div>
                    <div className="row align-items-center mb-1 d-flex">
                        <div className="col-12">
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale de production</span>
                                <span className="col-6">{TP}</span>
                                <span className="col-6">net :{TPnet}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale de production des malles</span>
                                <span className="col-6">{TPm}</span>
                                <span className="col-6">net :{TPnetm}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale de production des femalles</span>
                                <span className="col-6">{TPf}</span>
                                <span className="col-6">net :{TPnetf}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                     
                       
                        </div>
                        
                    </div>
                   
                </div>
         </div>

        </div>

        <div className="col-12 col-sm-6 col-md-3 mt-3">
            <div className="card bg-opacity-75 bg-success">
                <div className="card-statistic-3 p-2">
                    <div className="card-icon card-icon-large"><img style={{"width":150+"px","height":100+"px"}} src={vent}   ></img></div>
                    <div className="mb-12">
                        <h5 className="card-title mb-0">les statistiques des vents des lapins produits :</h5>
                    </div>
                    <div className="row align-items-center mb-1 d-flex">
                        <div className="col-12">
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale DES vents</span>
                                <span className="col-6">{TV}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité de lapins de sex inconue</span>
                                <span className="col-6">{TV-(TVf+TVm)}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité des malles</span>
                                <span className="col-6">{TVm}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">totale mortalité des femalles</span>
                                <span className="col-6">{TVf}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                        </div>
                        
                    </div>
                   
                </div>
         </div>

        </div>
        <div className="col-12 col-sm-6 col-md-3 mt-3">
            <div className="card bg-opacity-75 bg-primary">
                <div className="card-statistic-3 p-2">
                    <div className="card-icon card-icon-large"><img style={{"width":150+"px","height":100+"px"}} src={poids}   ></img></div>
                    <div className="mb-12">
                        <h5 className="card-title mb-0">les statistiques des poids des lapins produits</h5>
                    </div>
                    <div className="row align-items-center mb-1 d-flex">
                        <div className="col-12">
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">moyenne des poids au sevrage ce mois</span>
                                <span className="col-6">{MPS}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">moyenne des poids a la naissance ce mois</span>
                                <span className="col-6">{MPN}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">le plus grand poids aux sevrage ce mois</span>
                                <span className="col-6">{TOPPS}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">le plus grand poids a la naissance ce mois</span>
                                <span className="col-6">{TOPPN}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">le plus bas poids aux sevrage ce mois</span>
                                <span className="col-6">{BASPS}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                            <p className="d-flex align-items-center mb-0 row justify-content-arround">
                                <span className="col-12">le plus bas poids a la naissance ce mois</span>
                                <span className="col-6">{BASPN}</span>
                                <span className="col-6">12.5%<i className="fa fa-arrow-up"></i></span>
                            </p>
                        </div>
                        
                    </div>
                   
                </div>
            </div>

        </div>
        </div>

      </div>);
}
export default FemalleDetails