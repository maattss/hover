import firebase from 'firebase';
import 'firebase/functions';
import { firebaseConfig } from './config';

const Firebase = firebase.initializeApp(firebaseConfig);
export const fns = firebase.functions();

export default Firebase;
