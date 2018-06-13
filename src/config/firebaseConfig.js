import firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyCbsYvnWl77-ogBrBesLZ5r97mrmPaJpYY",
  authDomain: "sm-app-a47c8.firebaseapp.com",
  databaseURL: "https://sm-app-a47c8.firebaseio.com",
  projectId: "sm-app-a47c8",
  storageBucket: "sm-app-a47c8.appspot.com",
  messagingSenderId: "264443462543"
}

let app = firebase.initializeApp(config);
export const db = app.database()

export const claimantRef = db.ref('claimants');
export const galleryRef = db.ref('gallery');
export const orgRef = db.ref('org');
export const newsRef = db.ref('news');
export const licenceRef = db.ref('licences');
export const noteRef = db.ref('note');
export const eventRef = db.ref('event');
export const placeRef = db.ref('place');
export const docsRef = db.ref('documents');

export const firebaseAuth = firebase.auth;
