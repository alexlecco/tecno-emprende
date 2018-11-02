import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzrjcWIaL1FiQHaJAYBlZvpaqlLa6xVRo",
  authDomain: "tecnoemprende-8c3a1.firebaseapp.com",
  databaseURL: "https://tecnoemprende-8c3a1.firebaseio.com",
  projectId: "tecnoemprende-8c3a1",
  storageBucket: "tecnoemprende-8c3a1.appspot.com",
  messagingSenderId: "1089655845640"
};
firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase;

export {
	firebaseApp,
};