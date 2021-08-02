import React, { useState, useContext } from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton, IonText, IonRow, IonCol } from '@ionic/react'
import LoginFireBase from './LoginFirebase'
import RegisterFireBase from './RegisterFirebase'
import StateContext from '../../StateContext'

const AuthFirebase: React.FC = () => {

    const [activeItem, setActiveItem] = useState("1")
    const {loggedIn, userId} = useContext(StateContext)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton  defaultHref="/" />
                    </IonButtons>
                    <IonTitle>{activeItem === "1" ? "Logg inn" : "Registrering"}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                {loggedIn && (
                    <IonRow>
                        <IonCol className="ion-text-center">
                            <IonText color="success"><p>Du logget inn</p></IonText>
                            <IonButton routerLink="/lokalfotball">Gå hjem</IonButton>
                        </IonCol>
                    </IonRow> 
                )}
                 
                {!loggedIn && <React.Fragment>
                    {activeItem === "1" && <LoginFireBase/>}
                    {activeItem === "2" && <RegisterFireBase />}

                    {activeItem === "1" && <IonButton fill="outline" expand="block" onClick={() => setActiveItem("2")}>Registrer</IonButton>}
                    {activeItem === "2" && <IonButton fill="outline" expand="full" onClick={() => setActiveItem("1")}>Logg inn</IonButton>}
                    <IonButton expand="block" color="danger" routerLink="/auth-firebase/reset-password">Glemt passord? Trykk her</IonButton>
                </React.Fragment>
                }

            </IonContent>
        </IonPage>
    )
}
export default AuthFirebase