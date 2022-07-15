import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAk1onGOB7XV_YjbYvTnDzG6iyDSLzJJxg',
  authDomain: 'cooking-ninja-site-4a4d9.firebaseapp.com',
  projectId: 'cooking-ninja-site-4a4d9',
  storageBucket: 'cooking-ninja-site-4a4d9.appspot.com',
  messagingSenderId: '47991724247',
  appId: '1:47991724247:web:2e6137c99f91f04d68b892',
}

//   Init firebase
firebase.initializeApp(firebaseConfig)

// Init services
const projectFirestore = firebase.firestore()

export { projectFirestore }
