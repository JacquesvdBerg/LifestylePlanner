import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB7vlwcRV2qAt2l7Mol-jznoW5UorT20KY",
  authDomain: "jqcheckin.firebaseapp.com",
  projectId: "jqcheckin",
  storageBucket: "jqcheckin.appspot.com",
  messagingSenderId: "682102187587",
  appId: "1:682102187587:web:e56623d94e4e26f8ced6f6",
  measurementId: "G-MLEBT551RL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
