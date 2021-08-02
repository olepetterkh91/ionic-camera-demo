import { IonButton, IonInput, IonItem, IonLabel, IonTextarea, IonToast, isPlatform } from "@ionic/react";
import { useContext, useRef, useState } from "react";
import { firestore, storage } from "../../../firebase"
import {Camera, CameraResultType} from "@capacitor/camera"
import StateContext from "../../../StateContext";

const AddImage: React.FC = () => {
    const {userId} = useContext(StateContext)
    const [pictureUrl, setPictureUrl] = useState("https://progitek.no/wp-content/uploads/2020/07/internet-technology-computer-display-1089440.jpg");
    const [title, setTitle] = useState<any>("");
    const [description, setDescription] = useState<any>("");
    const [message, setMessage] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files.item(0);
            const pictureUrl = URL.createObjectURL(file);
            setPictureUrl(pictureUrl);
        }
    }

    async function handlePictureClick() {
        if (isPlatform("capacitor")) {
            try {
                const photo: any = await Camera.getPhoto({
                    resultType: CameraResultType.Uri
                })
                setPictureUrl(photo.webPath)
            } catch (error) {
                console.log(error)
            }
        } else {
            fileInputRef?.current?.click()
        }
    }

    async function handleSave() {
        const imageUrl = await savePicture(pictureUrl);  
        console.log(imageUrl)  
        setPictureUrl(imageUrl)
    }

    async function savePicture(blobUrl: string) {
        let pictureRef;
        const date = new Date().toISOString();
        pictureRef = storage.ref("/images/" + date);

        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const snapshot = await pictureRef.put(blob);
        const url = await snapshot.ref.getDownloadURL();
        saveImageToFirebase(url)
        return url;
    }

    async function saveImageToFirebase(url: string) {
        const imageRef = firestore.collection("images");
        try {
            const data = {
                imageUrl: url,
                user_id: userId,
                type: "gallery",
                date_added: new Date().toISOString(),
                title,
                description,
                username: "",
                avatar: ""
            }
            imageRef.add(data);
            setMessage("Bilde lagret!");
            setTimeout(() => {
                setMessage("");
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <IonItem>
                <IonLabel position="stacked">
                    Picture (Click image to add new)
                </IonLabel>
                <br />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ visibility: "hidden" }}
                />
                <img
                    src={pictureUrl}
                    style={{ cursor: "pointer" }}
                    alt=""
                    onClick={handlePictureClick}
                />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Tittel</IonLabel>
                <IonInput value={title} onIonChange={e => setTitle(e.detail.value)} />
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Beskrivelse</IonLabel>
                <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value)} />
            </IonItem>
            <IonButton expand="block" onClick={handleSave}>Save</IonButton>

            <IonToast isOpen={message ? true : false} message={message} onDidDismiss={() => setMessage("")} position="top" />
        </>
    )
}
export default AddImage