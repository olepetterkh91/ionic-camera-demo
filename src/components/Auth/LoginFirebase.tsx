import React, { useState } from 'react'
import { IonList, IonItem, IonLabel, IonInput, IonButton, IonText, IonLoading } from '@ionic/react'
import { auth } from '../../firebase'

const LoginFireBase: React.FC = () => {

    const [password, setPassword] = useState<any>("")
    const [email, setEmail] = useState<any>("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        try {
            const credential = await auth.signInWithEmailAndPassword(email, password)
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
                <IonInput value={email} onIonChange={e => setEmail(e.detail.value)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Passord</IonLabel>
                <IonInput type="password" value={password} onIonChange={e => setPassword(e.detail.value)} />
            </IonItem>
            {error && <IonText color="danger">Ugyldig passord eller epost</IonText>}
            <IonButton onClick={handleLogin} expand="block">Logg inn</IonButton>
            <IonLoading isOpen={loading} />
        </IonList>
    )
}
export default LoginFireBase