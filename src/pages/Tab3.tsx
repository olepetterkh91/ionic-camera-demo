import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import AuthFirebase from '../components/Auth/AuthFirebase';
import Logout from '../components/Auth/Logout';
import ExploreContainer from '../components/ExploreContainer';
import StateContext from '../StateContext';
import './Tab3.css';

const Tab3: React.FC = () => {

  const {loggedIn} = useContext(StateContext)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loggedIn && (
          <>
          <p>Logget inn!</p>
          <Logout />
          </>
        )}
        {!loggedIn && <AuthFirebase />}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
