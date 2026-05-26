import {IonContent,
  IonPage,
  IonText,
} from '@ionic/react';

import './Home.css';
import MenuLateral from '../components/MenuLateral';
import ToolbarHome from '../components/ToolbarHome';
import Button from '../components/Button';

const Home: React.FC = () => {

  return (
    <>
      <MenuLateral/>

      <IonPage id="main-content">

        <ToolbarHome/>

        <IonContent fullscreen className="fondo">

          <div className="wrapper-home">

            <div className="card1-home">

              <IonText className="welcome-text-home">
                ¡Bienvenido a ConduceFácil!
              </IonText>

              <IonText className="text-home">
                En esta página podrás agendar tus clases de conducción, 
                obtener información acerca de las escuelas y de los horarios 
                de la municipalidad para poder agendar tus exámenes de conducción.
              </IonText>

              <IonText className="text-home">
                A continuación estarán disponibles las distintas opciones que 
                ofrece esta aplicación, aunque también puede acceder a cualquiera 
                de estas a través del menú lateral ubicado arriba a la izquierda.
              </IonText>

              <IonText className="text-home">
                Si aún no ha iniciado sus clases de conducción, le recomendamos 
                revisar el mapa interactivo en donde podrá visualizar las distintas 
                escuelas de conducción de las comunas. Puede ver su ubicación e información 
                de los cursos que ofrecen, horarios y precios, además de su rating, también 
                habrá un link que le permitirá ir a su página oficial donde podrá agendar su 
                curso de conducción deseado. 
              </IonText>

            </div>

            <div className="card2-home">

              <Button
                texto="Mapa interactivo"
                expand='block'
                background="#0D678E"
                textColor="#FFFFFF"
                fontSize="16px"
                ancho="20%"
                routerLink="/map"
              />

              <IonText className="text-home">
                Si aún no ha iniciado sus clases de conducción, le recomendamos 
                revisar el mapa interactivo en donde podrá visualizar las distintas 
                escuelas de conducción de las comunas. Puede ver su ubicación e información 
                de los cursos que ofrecen, horarios y precios, además de su rating, tambien 
                habrá un link que le permitirá ir a su página oficial donde podrá agendar su 
                curso de conducción deseado.
              </IonText>

              <div className="divisor-home"></div>

              <Button
                texto="Agendar examen"
                expand='block'
                background="#0D678E"
                textColor="#FFFFFF"
                ancho="20%"
                fontSize="16px"
                routerLink="/agendar-examen"
              />

              <IonText className="text-home">
                Si ya ha aprobado su curso o quiere agendar su examen de conducción, 
                presione el botón "Agendar examen" y registre la información solicitada.
              </IonText>

            </div>

          </div>

        </IonContent>

      </IonPage>
    </>
  );
};

export default Home;