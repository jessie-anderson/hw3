import Firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCfrP62rK7kG7LZPyKpt9AC4jDiLqGSb78',
  authDomain: 'sticky-notes-fb6b9.firebaseapp.com',
  databaseURL: 'https://sticky-notes-fb6b9.firebaseio.com',
  storageBucket: 'sticky-notes-fb6b9.appspot.com',
};
Firebase.initializeApp(config);

// Get a reference to the database service
const database = Firebase.database();
