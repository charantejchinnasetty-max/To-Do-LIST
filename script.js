// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";


// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyCsiFyyZItNL5r4s_r6QMl3-LEAZuNN6d8",
    authDomain: "todoapp-5a5b7.firebaseapp.com",
    projectId: "todoapp-5a5b7",
    storageBucket: "todoapp-5a5b7.firebasestorage.app",
    messagingSenderId: "200668242027",
    appId: "1:200668242027:web:541619e9fd59eb51fd512e",
    measurementId: "G-110DDKB4VK"
};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// HTML ELEMENTS
const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");


// SAVE TASK TO FIREBASE
async function saveTaskToFirebase(taskText){

    try{

        await addDoc(collection(db, "tasks"), {

            task: taskText,

            createdAt: new Date()
        });

        console.log("Task Saved");

    }
    catch(error){

        console.log(error);
    }
}


// ADD TASK
async function addTask(){

    if(inputBox.value === ""){

        alert("Please enter something!");

        return;
    }

    // SAVE TO FIREBASE
    await saveTaskToFirebase(inputBox.value);

    // CLEAR INPUT
    inputBox.value = "";

    // RELOAD TASKS
    loadTasks();
}


// LOAD TASKS FROM FIREBASE
async function loadTasks(){

    // CLEAR OLD UI
    listContainer.innerHTML = "";

    // GET FIREBASE DATA
    const querySnapshot = await getDocs(collection(db, "tasks"));

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        let li = document.createElement("li");

        li.innerHTML = data.task;

        // DELETE BUTTON
        let span = document.createElement("span");

        span.innerHTML = "\u00d7";

        li.appendChild(span);

        listContainer.appendChild(li);
    });
}


// CHECK / DELETE
listContainer.addEventListener("click", function(e){

    // CHECK TASK
    if(e.target.tagName === "LI"){

        e.target.classList.toggle("checked");
    }

    // DELETE TASK
    else if(e.target.tagName === "SPAN"){

        e.target.parentElement.remove();
    }

}, false);


// FIRST LOAD AFTER REFRESH
loadTasks();


// GLOBAL FUNCTION
window.addTask = addTask;