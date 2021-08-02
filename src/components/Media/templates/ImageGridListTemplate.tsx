import { IonAvatar, IonButton, IonButtons, IonCard, IonIcon, IonImg, IonItem, IonLabel } from "@ionic/react"
import { bookmark, bookmarkOutline, chatbubble, chatbubbleOutline, ellipsisHorizontal, heart, heartOutline, paperPlaneOutline, paperPlaneSharp } from "ionicons/icons"
import React from "react"

const ImageGridListTemplate: React.FC<{
    image: any
}> = ({image}) => {
    return (
        <React.Fragment>
            <IonItem lines="full">
                <IonAvatar slot="start">
                    <IonImg src={image?.avatar || ""} />
                </IonAvatar>
                <IonLabel>Test</IonLabel>
                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={ellipsisHorizontal} />
                    </IonButton>
                </IonButtons>
            </IonItem>
            <IonImg src={image?.imageUrl} alt="" />
            <IonItem lines="none">
                <IonButtons slot="start">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={heartOutline} />
                    </IonButton>
                    <IonButton>
                        <IonIcon slot="icon-only" icon={chatbubbleOutline} />
                    </IonButton>
                    <IonButton>
                        <IonIcon slot="icon-only" icon={paperPlaneOutline} />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon slot="icon-only" icon={bookmarkOutline} />
                    </IonButton>
                </IonButtons>
            </IonItem>
            <IonItem lines="none">
                <IonLabel slot="start">
                    <p><strong>76 liker</strong></p>
                    <p><strong>{image?.username}</strong> {image?.description}</p>
                </IonLabel>
                <IonLabel slot="start"></IonLabel>
            </IonItem>
        </React.Fragment>
    )
}
export default ImageGridListTemplate