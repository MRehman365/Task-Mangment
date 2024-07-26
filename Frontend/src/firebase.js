import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA_aPl8uv9in79Trtidp746xiXbAc5DgvU",
  authDomain: "task-mangment-system-94014.firebaseapp.com",
  projectId: "task-mangment-system-94014",
  storageBucket: "task-mangment-system-94014.appspot.com",
  messagingSenderId: "1068366676276",
  appId: "1:1068366676276:web:12d39d1a6a9090f07fa561",
  measurementId: "G-M64KVNB88P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
