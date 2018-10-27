import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import {FirebaseConfig} from './firebase-config';

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const watchListRef = databaseRef.child('watchlists');
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
