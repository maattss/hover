import firebase from 'firebase';
import 'firebase/functions.js';
import firebaseConfig from './FirebaseConfig';

const Firebase = firebase.initializeApp(firebaseConfig);
export const fns = firebase.functions();

export default Firebase;
