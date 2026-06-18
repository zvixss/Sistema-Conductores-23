import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Map from './pages/Map';
import Perfil from './pages/Perfil';
import Trayectoria from './pages/Trayectoria';
import AgendarExamen from './pages/AgendarExamen';
import AgendarExamenPL from './pages/AgendarExamenPL';
import AgendarExamenAL from './pages/AgendarExamenAL';
import AgendarExamenR from './pages/AgendarExamenR';
import AgendarExamenF from './pages/AgendarExamenF';
import MapMunicpal from './pages/MapMunicpal';
import ActualizarExamen from './pages/ActualizarExamen';
import Notificaciones from './pages/Notificaciones';
import EditarUsuario from './pages/EditarUsuario';
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

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const PrivateRoute: React.FC<{ component: React.FC; path: string; exact?: boolean; requiredRole?: string }> = ({ component: Component, requiredRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const token = localStorage.getItem('token');
        const usuarioLocal = localStorage.getItem('usuario');
        const usuario = usuarioLocal ? JSON.parse(usuarioLocal) : null;

        if (!token) {
          return <Redirect to="/login" />;
        }

        // EL CANDADO MÁGICO: Si la ruta exige admin y el usuario no lo es, lo patea al home
        if (requiredRole && usuario?.rol !== requiredRole) {
          return <Redirect to="/home" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* RUTAS PÚBLICAS */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        
        {/* RUTAS PROTEGIDAS (SOLO PARA USUARIOS LOGUEADOS) */}
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/map" component={Map} />
        <PrivateRoute exact path="/perfil" component={Perfil} />
        <PrivateRoute exact path="/trayectoria" component={Trayectoria} />
        <PrivateRoute exact path="/agendar-examen" component={AgendarExamen} />
        <PrivateRoute exact path="/agendar-examen-pl" component={AgendarExamenPL} />
        <PrivateRoute exact path="/agendar-examen-al" component={AgendarExamenAL} />
        <PrivateRoute exact path="/agendar-examen-r" component={AgendarExamenR} />
        <PrivateRoute exact path="/agendar-examen-f" component={AgendarExamenF} />
        <PrivateRoute exact path="/map-municipal" component={MapMunicpal} />
        <PrivateRoute exact path="/actualizar-examen" component={ActualizarExamen} />
        <PrivateRoute exact path="/notificaciones" component={Notificaciones} />
        <PrivateRoute exact path="/editar-usuario" component={EditarUsuario} />
        
        {/* RUTAS SÚPER PROTEGIDAS (SOLO PARA ADMIN) */}
        <PrivateRoute exact path="/admin" component={Admin} requiredRole="admin" />
        <PrivateRoute exact path="/admin-options/:id" component={AdminOptions} requiredRole="admin" />

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;