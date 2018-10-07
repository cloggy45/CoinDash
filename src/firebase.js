import * as firebase from 'firebase';
import { FirebaseConfig } from './firebase-config';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const watchListRef = databaseRef.child('favourites');
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
