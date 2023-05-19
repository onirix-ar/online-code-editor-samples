# Send data to Firebase

This example shows how to send data to a Firestore collection in a Firebase project.

Remember that you need to modify the `firebaseConfig` values with the ones specific to your Firebase project.


```
firebaseConfig = {
    apiKey: "YOUR_PROJECT_API_KEY",
    authDomain: "YOUR_PROJECT_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_STORAGE_BUCKET",
    messagingSenderId: "YOUR_PROJECT_MESSAGING_SENDER_ID",
    appId: "YOUR_PROJECT_APP_ID",
    measurementId: "YOUR_PROJECT_MEASUREMENT_ID"
};

```

[Create a Firestore database by using a web or mobile client library](https://cloud.google.com/firestore/docs/create-database-web-mobile-client-library)