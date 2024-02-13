import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAIuZAEZQU2MA2ceM_CgMimAhhsJjpRzbo",
  authDomain: "todo-1526a.firebaseapp.com",
  projectId: "todo-1526a",
  storageBucket: "todo-1526a.appspot.com",
  messagingSenderId: "892392150701",
  appId: "1:892392150701:web:e14268dbfccf4e85f71824",
  measurementId: "G-TTHK74FB8J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
