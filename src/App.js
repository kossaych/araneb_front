import Footer from "./components/parts/footer";
import Home from "./components/pages/home";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./components/authentication/register";
import ResetPassword from "./components/authentication/reset-password";
import Login from "./components/authentication/login";
import ChangePassword from "./components/authentication/change_password";
import CreateFemalle from "./components/managment/parents-bar/femalle-bar/create";
import CreateMalle from "./components/managment/parents-bar/malle-bar/create";
import ProductionBar from "./components/managment/production-bar";
import CreateGroupe from "./components/managment/production-bar/create";
import AcouplementBar from "./components/managment/acouplement";
import CreateAcouplement from "./components/managment/acouplement/create";
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
import CreateMalleProduction from "./components/managment/parents-bar/malle-bar/create_production";
import OFFLINE from "./components/pages/ofline";
import Parents from "./components/managment/parents-bar/femalle-bar";

function App()  {

  return (


    <div className="App ">
      {window.navigator.onLine ?       <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path="reset_password" element={<ResetPassword/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="change_password" element={<ChangePassword/>}></Route>
          
          
          <Route path="managment/manager/parents" element={<Parents/>}></Route>
          <Route path="managment/manager/femalles/create" element={<CreateFemalle/>}></Route>
          <Route path="managment/manager/femalles/create/production" element={<CreateFemalleProduction/>}></Route>
          <Route path="managment/manager/malles/create/production" element={<CreateMalleProduction/>}></Route>
          <Route path="managment/manager/malles/create" element={<CreateMalle/>}></Route>

         
         
          <Route path="managment/acouplement" element={<AcouplementBar/>}></Route>
          <Route path="managment/production" element={<ProductionBar/>}></Route>
          <Route path="managment/manager/create/:id/:acc" element={<CreateGroupe/>}></Route>
          <Route path="managment/acouplement/create" element={<CreateAcouplement/>}></Route>
          <Route path="managment/acouplement/test/:id/:num" element={<TestAcouplement/>}></Route>
          <Route path="managment/acouplement/fause-couche/:id/:num" element={<FauseCoucheAcouplement/>}></Route>
          <Route path="managment/manager/details/:id" element={<ProductionDetails/>}></Route>
          <Route path="managment/acouplement/update/:id/:num" element={<UpdateAcouplement/>}></Route>
          <Route path="managment/groupe/update/:id" element={<UpdateGroupeProduction/>}></Route>
          <Route path="managment/groupe/mort_masse/:id/:cage" element={<MMorteMasse/>}></Route>
          <Route path="managment/groupe/vente_masse/:id/:cage" element={<VenteMasse/>}></Route>
          <Route path="managment/groupe/sevreage/:id/:cage" element={<Sevrage/>}></Route>
          <Route path="managment/groupe/poid_mesure/:id/:cage" element={<PoidLapins/>}></Route>
          <Route path="managment/groupe/vaccin/:id/:cage" element={<VaccinLapins/>}></Route>
          <Route path="managment/groupe/lapin/update/:id/:cage" element={<LapinProductionUpdate/>}></Route>


          <Route path="home/statistique" element={<home/>}></Route>

      
      </Routes>

      <Footer />
      </BrowserRouter>: <OFFLINE />}

    </div>
  );
}

export default App;
