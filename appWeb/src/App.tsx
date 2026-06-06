import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Map from './pages/Map';
import Perfil from './pages/Perfil';
import AgendarExamen from './pages/AgendarExamen';
import AgendarExamenPL from './pages/AgendarExamenPL';
import AgendarExamenAL from './pages/AgendarExamenAL';
import AgendarExamenF from './pages/AgendarExamenF';
import AgendarExamenR from './pages/AgendarExamenR';
import EditarUsuario from './pages/EditarUsuario';
import Notificaciones from './pages/Notificaciones';
import MapMunicipal from './pages/MapMunicpal';
import Trayectoria from './pages/Trayectoria';
import Admin from './pages/Admin';
import AdminOptions from './pages/AdminOptions';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
        <Route exact path="/perfil">
          <Perfil />
        </Route>
        <Route exact path="/agendar-examen">
          <AgendarExamen />
        </Route>
        <Route exact path="/agendar-examen-pl">
          <AgendarExamenPL />
        </Route>
        <Route exact path="/agendar-examen-al">
          <AgendarExamenAL />
        </Route>
        <Route exact path="/agendar-examen-f">
          <AgendarExamenF />
        </Route>
        <Route exact path="/agendar-examen-r">
          <AgendarExamenR />
        </Route>
        <Route exact path="/editar-usuario">
          <EditarUsuario />
        </Route>
        <Route exact path="/notificaciones">
          <Notificaciones />
        </Route>
        <Route exact path="/map-municipal">
          <MapMunicipal />
        </Route>
        <Route exact path="/trayectoria">
          <Trayectoria />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/admin-options/:id">
          <AdminOptions />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
