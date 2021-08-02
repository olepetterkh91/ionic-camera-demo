import { IonButton } from "@ionic/react"
import { useContext } from "react"
import DispatchContext from "../../DispatchContext"
import { auth } from "../../firebase"

const Logout: React.FC = () => {

    const appDispatch: any = useContext(DispatchContext)

    function logout() {
        appDispatch({type: "loggedOut", value: ""})
        auth.signOut();
    }

    return (
        <IonButton color="light" expand="block" onClick={logout}>
            Logg ut
        </IonButton>
    )
}
export default Logout