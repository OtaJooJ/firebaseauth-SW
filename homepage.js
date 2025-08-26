// Importa as funções necessárias do firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAZIJFAxszHUdXlbRII4hw7ntTju32XuF0",
    authDomain: "fir-auth-dd1a8.firebaseapp.com",
    projectId: "fir-auth-dd1a8",
    storageBucket: "fir-auth-dd1a8.firebasestorage.app",
    messagingSenderId: "218880570359",
    appId: "1:218880570359:web:66f2b93ffe6c74801db4f2"
  };

// Inicializa o firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Configura o firebase Authentication
const db = getFirestore(); // Configura o firestore

// Monitora o estado de autenticação do usuário
onAuthStateChanged(auth, (user) => {
    // Busca o ID do usuário autenticado salvo no localStorage
    const loggedInUserId = localStorage.getItem("loggedInUserId");
    
    // Se o ID estiver no localSotrage, tenta obter os dados do Firestore
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId); // Referência ao documento do usuário no Firestore

        getDoc(docRef) // Busca o documento
        .then((docSnap) => {
            // Se o documento existir, exibe os dados na interface
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById("loggedUserFName").innerText = userData.firstName;
                document.getElementById("loggedUserLName").innerText = userData.lastName;
                document.getElementById("loggedUserEmail").innerText = userData.email;
            } else {
                console.log("ID não encontrado no Documento");
            }
        })
        .catch((error) => {
            console.log("Documento não encontrado");
        });
    } else {
        console.log("ID de usuário não encontrado no localStorage");
    }
});

// Lógica de Logout
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId"); // Remove o ID do LocalStorage
    signOut(auth) //Realiza logout
    .then(() => {
        window.location.href = "index.html"; // Redireciona para a página de login
    })
    .catch((error) => {
        console.error("Error Signing Out:", error);
    });
});