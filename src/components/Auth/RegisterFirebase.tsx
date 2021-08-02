import React, { useState } from 'react'
import {auth} from '../../firebase'
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonText, IonLoading } from '@ionic/react'

const RegisterFireBase: React.FC = () => {

    const [password, setPassword] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [username, setUsername] = useState<any>("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
        setLoading(true)
        try {
            const credential = await auth.createUserWithEmailAndPassword(email, password)
            console.log('Credential:', credential)
        } catch (error) {
            setError(true)
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <IonList>
            <IonItem>
                <IonLabel position="floating">Epost</IonLabel>
                <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Brukernavn</IonLabel>
                <IonInput value={username} onIonChange={e => setUsername(e.detail.value)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Passord</IonLabel>
                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value)} />
            </IonItem>

            {error && <IonText color="danger">Ugyldig passord eller epost</IonText>}
            
            <IonButton onClick={handleRegister} expand="block">Registrer</IonButton>
            <IonLoading isOpen={loading} />
        </IonList>
    )
}
export default RegisterFireBase