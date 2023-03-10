import Footer from "./components/parts/footer";
import Home from "./components/pages/home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import FemallesBar from "./components/managment/parents-bar/femalle-bar";
import MallesBar from "./components/managment/parents-bar/malle-bar";
import Register from "./components/authentication/register";
import ResetPassword from "./components/authentication/reset-password";
import Login from "./components/authentication/login";
import ChangePassword from "./components/authentication/change_password";
import CreateFemalle from "./components/managment/parents-bar/femalle-bar/create";
import CreateMalle from "./components/managment/parents-bar/malle-bar/create";
import FemalleMorte from "./components/managment/parents-bar/femalle-bar/mort";
import MalleMorte from "./components/managment/parents-bar/malle-bar/mort";
import FemalleUpdate from "./components/managment/parents-bar/femalle-bar/update";
import MalleUpdate from "./components/managment/parents-bar/malle-bar/update";
import FemalleVent from "./components/managment/parents-bar/femalle-bar/vent";
import MalleVent from "./components/managment/parents-bar/malle-bar/vent";
import FemalleDetails from "./components/managment/parents-bar/femalle-bar/details";
import ProductionBar from "./components/managment/production-bar";
import CreateGroupe from "./components/managment/production-bar/create";
import AcouplementBar from "./components/managment/acouplement";
import CreateAcouplement from "./components/managment/acouplement/create";
import React, { useEffect } from "react"
import TestAcouplement from "./components/managment/acouplement/test";
import UpdateAcouplement from "./components/managment/acouplement/update";
import FauseCoucheAcouplement from "./components/managment/acouplement/fausse-couche";
import UpdateGroupeProduction from "./components/managment/production-bar/update";
import ProductionDetails from "./components/managment/production-bar/groupe_details";
import CreateFemalleProduction from "./components/managment/parents-bar/femalle-bar/create_production";
import MMorteMasse from "./components/managment/production-bar/mort_masse";
import VenteMasse from "./components/managment/production-bar/vente_masse";
import Sevrage from "./components/managment/production-bar/sevrage";
import PoidLapins from "./components/managment/production-bar/poid_lapins";
import VaccinLapins from "./components/managment/production-bar/vaccins";
import LapinProductionUpdate from "./components/managment/production-bar/update_lapin";

function App()  {

  return (


    <div className="App ">
   
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="reset_password" element={<ResetPassword/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="change_password" element={<ChangePassword/>}></Route>
          
          
          <Route path="managment/parents/femalles" element={<FemallesBar/>}></Route>
          <Route path="managment/parents/malles" element={<MallesBar/>}></Route>
          <Route path="managment/parents/femalles/create" element={<CreateFemalle/>}></Route>
          <Route path="managment/parents/femalles/create/production" element={<CreateFemalleProduction/>}></Route>
          <Route path="managment/parents/malles/create" element={<CreateMalle/>}></Route>
          <Route path="managment/parents/femalles/morte/:id/:cage" element={<FemalleMorte/>}></Route>
          <Route path="managment/parents/malles/morte/:id/:cage" element={<MalleMorte/>}></Route>
          <Route path="managment/parents/femalles/update/:id/:cage" element={<FemalleUpdate/>}></Route>
          <Route path="managment/parents/malles/update/:id/:cage" element={<MalleUpdate/>}></Route>
          <Route path="managment/parents/femalles/vent/:id/:cage" element={<FemalleVent/>}></Route>
          <Route path="managment/parents/malles/vent/:id/:cage" element={<MalleVent/>}></Route>
          <Route path="managment/parents/femalles/details/:id/:cage" element={<FemalleDetails/>}></Route>

         
         
          <Route path="managment/acouplement" element={<AcouplementBar/>}></Route>
          <Route path="managment/production" element={<ProductionBar/>}></Route>
          <Route path="managment/production/create/:id/:acc" element={<CreateGroupe/>}></Route>
          <Route path="managment/acouplement/create" element={<CreateAcouplement/>}></Route>
          <Route path="managment/acouplement/test/:id/:num" element={<TestAcouplement/>}></Route>
          <Route path="managment/acouplement/fause-couche/:id/:num" element={<FauseCoucheAcouplement/>}></Route>
          <Route path="managment/production/details/:id" element={<ProductionDetails/>}></Route>
          <Route path="managment/acouplement/update/:id/:num" element={<UpdateAcouplement/>}></Route>
          <Route path="managment/groupe/update/:id" element={<UpdateGroupeProduction/>}></Route>
          <Route path="managment/groupe/mort_masse/:id/:cage" element={<MMorteMasse/>}></Route>
          <Route path="managment/groupe/vente_masse/:id/:cage" element={<VenteMasse/>}></Route>
          <Route path="managment/groupe/sevreage/:id/:cage" element={<Sevrage/>}></Route>
          <Route path="managment/groupe/poid_mesure/:id/:cage" element={<PoidLapins/>}></Route>
          <Route path="managment/groupe/vaccin/:id/:cage" element={<VaccinLapins/>}></Route>
          <Route path="managment/groupe/lapin/update/:id/:cage" element={<LapinProductionUpdate/>}></Route>




          <Route path="home/statistique" element={<home/>}></Route>
          <Route path="blog" element={<Home/>}></Route>
          <Route path="market" element={<Home/>}></Route>
      
      </Routes>

      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
