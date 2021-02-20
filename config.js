import * as firebase from "firebase"
require("@firebase/firestore")
var firebaseConfig={
    
    apiKey: "AIzaSyBi_nLZdXT2L_7n5ctECxGvMCMg7VVQZms",
    authDomain: "booksanta-999a2.firebaseapp.com",
    projectId: "booksanta-999a2",
    storageBucket: "booksanta-999a2.appspot.com",
    messagingSenderId: "673909279498",
    appId: "1:673909279498:web:747ebd14e02973674288f3"
}

firebase.initializeApp(firebaseConfig)
export default firebase.firestore()