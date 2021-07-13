import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMdLkrXFtcaKr3KcMZDYH4LweYnc1sOHc",
  authDomain: "whatsapp-clone-4e63b.firebaseapp.com",
  projectId: "whatsapp-clone-4e63b",
  storageBucket: "whatsapp-clone-4e63b.appspot.com",
  messagingSenderId: "509778678065",
  appId: "1:509778678065:web:88e4c3c137be0370fde010",
  measurementId: "G-098YPW8GME"
};



const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;