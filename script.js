// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsiFyyZItNL5r4s_r6QMl3-LEAZuNN6d8",
  authDomain: "todoapp-5a5b7.firebaseapp.com",
  projectId: "todoapp-5a5b7",
  storageBucket: "todoapp-5a5b7.firebasestorage.app",
  messagingSenderId: "200668242027",
  appId: "1:200668242027:web:541619e9fd59eb51fd512e",
  measurementId: "G-110DDKB4VK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
async function saveTaskToFirebase(taskText) {
    try {
        await addDoc(collection(db, "tasks"), {
            task: taskText,
            createdAt: new Date()
        });

        console.log("Task Saved");
    } catch (error) {
        console.log(error);
    }
}
function addTask(){
    if(inputBox.value === ""){
        alert("you must be enter something....!");  
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveTaskToFirebase(inputBox.value);
        saveData();


    }
    inputBox.value = "";
}

    listContainer.addEventListener("click", function(e){
        if (e.target.tagName === "LI"){
            e.target.classList.toggle("checked");
            saveTaskToFirebase(inputBox.value);
saveData();

        }
        else if(e.target.tagName ==="SPAN"){
            e.target.parentElement.remove();
            saveTaskToFirebase(inputBox.value);
saveData();
        }

    },false);

    function saveData(){
        localStorage.setItem("data",listContainer.innerHTML);

    }

    function showData(){
        listContainer.innerHTML = localStorage.getItem("data");
    }

    showData();

window.addTask = addTask;

