import { IonCol, IonGrid, IonRow } from "@ionic/react"
import { useEffect, useState } from "react"
import { firestore } from "../../firebase";
import ImageGridListTemplate from "./templates/ImageGridListTemplate";

const Images: React.FC = () => {

    const [images, setImages] = useState<any>([]);

    useEffect(() => {
        const imagesRef = firestore.collection("images");
        imagesRef.orderBy("date_added", "desc").onSnapshot(({docs}) => {
            const imagesFB = docs.map(doc => {
                return {id: doc.id, ...doc.data()}
            })
            setImages(imagesFB);
        })
    }, [])

    return (
        <IonGrid>
            <IonRow>
                <IonCol sizeLg="8" sizeXl="6" offsetLg="2" offsetXl="3">
                    {images?.map((image: any, index: number) => <ImageGridListTemplate key={index} image={image} />)}
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}
export default Images