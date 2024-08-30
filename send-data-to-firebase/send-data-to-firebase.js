
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore-lite.js";
import OnirixEmbedSDK from "https://www.unpkg.com/@onirix/embed-sdk@1.11.2/dist/ox-embed-sdk.esm.js";

/**
 * OxFirebase allows you to comunicates with the Firebase API and store data in Firestore.
 */
export default class OxFirebase {
    
    firebaseConfig = {
        apiKey: "YOUR_PROJECT_API_KEY",
        authDomain: "YOUR_PROJECT_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_STORAGE_BUCKET",
        messagingSenderId: "YOUR_PROJECT_MESSAGING_SENDER_ID",
        appId: "YOUR_PROJECT_APP_ID",
        measurementId: "YOUR_PROJECT_MEASUREMENT_ID"
    }; 
    
    app = null;
    db = null; 
    
    constructor() { 
        try {
            this.app = initializeApp(this.firebaseConfig);
            this.db = getFirestore(this.app);
        } catch (error) {
            console.error(`Error connecting to Firebase`, error);
        }
    } 
    
    async send(collectionName, data) {
        console.log(`Send data to collection`, data, collectionName);
        try {
            const i = collection(this.db, collectionName); 
            await addDoc(i, data);
        } catch (error) {
            console.error(`Error sending data to collection`, data, collectionName, error);
        }
    }
}

const embedSDK = new OnirixEmbedSDK();
await embedSDK.connect();
const oxFirebase = new OxFirebase();

/**
 * Listens when a user clicks on an element in the scene. 
 * It checks the name of the element and the oid to "ELEMENT_CLICKS" collection on Firestore.
 */
embedSDK.subscribe(OnirixEmbedSDK.Events.ELEMENT_CLICK, (params) => {
    oxFirebase.send("ELEMENT_CLICKS", {name: params.name, oid: params.oid});
});
