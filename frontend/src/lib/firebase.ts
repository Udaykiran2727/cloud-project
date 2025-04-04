// src/lib/firebase.ts  
import { initializeApp } from 'firebase/app';  
import { getAuth, GoogleAuthProvider } from 'firebase/auth';  
import { getStorage } from 'firebase/storage';  

const firebaseConfig = {  
  // Replace with your Firebase config  
  apiKey: "AIzaSyAjQGB8bgQFdwu98F3isMuF2he6XCMaSF8",  
  authDomain: "iridescence-page.firebaseapp.com",  
  projectId: "iridescence-page",  
  storageBucket: "iridescence-page.appspot.com",  
  messagingSenderId: "353853960233",  
  appId: "1:353853960233:web:9314ffc594041692356c38"  
};  

const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);  
export const googleProvider = new GoogleAuthProvider();  
export const storage = getStorage(app);  