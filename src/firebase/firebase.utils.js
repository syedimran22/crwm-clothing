import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore,setDoc,doc,getDoc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDgW9e8WUJvXoAHXeGVUg11Bg_FeHxavgo",
    authDomain: "crwn-db-4c07f.firebaseapp.com",
    projectId: "crwn-db-4c07f",
    storageBucket: "crwn-db-4c07f.appspot.com",
    messagingSenderId: "204738936459",
    appId: "1:204738936459:web:e0a4ca528ea91af2f69e8e",
    measurementId: "G-SDSEJVBL8H"
  }; 

export const createUserProfileDocument = async (userAuth,additionalData) => {
    
  if(!userAuth) return;
  const userRef = doc(db,`users/${userAuth.uid}`);
  const userSnap = await getDoc(userRef);
 
   if(!userSnap.exists()){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try{
      await setDoc(userRef,{
        displayName : displayName,
        email: email,
        createdAt : createdAt,
        ...additionalData
        });

      } catch(error){
        console.log('error createing user',error.message);
      }
    }
   return userRef;
}

 const app = initializeApp(config);
 export const auth = getAuth(app);
 export const db = getFirestore();

 const provider = new GoogleAuthProvider();
 provider.setCustomParameters({ prompt: 'select_account' });
 export const signInWithGoogle = () => {
   signInWithPopup(auth, provider)
 };
