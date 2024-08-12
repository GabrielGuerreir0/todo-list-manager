import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxuiBqtUwyDb1sl1HAKScQwXqONrwE14w",
  authDomain: "gerenciador-de-tasks.firebaseapp.com",
  projectId: "gerenciador-de-tasks",
  storageBucket: "gerenciador-de-tasks.appspot.com",
  messagingSenderId: "973575494561",
  appId: "1:973575494561:web:4b50df493422bddecd49e0",
  measurementId: "G-797CRVD4ES",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
