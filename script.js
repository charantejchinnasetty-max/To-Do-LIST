// FIREBASE IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
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

const selectedDate = document.getElementById("selectedDate");


// SET TODAY DATE
let today = new Date().toISOString().split("T")[0];

selectedDate.value = today;


// CHANGE DATE EVENT
selectedDate.addEventListener("change", loadTasksByDate);


// SAVE TASK
async function saveTaskToFirebase(taskText, taskDate){

    try{

        await addDoc(collection(db, "tasks"), {

            task: taskText,

            taskDate: taskDate,

            completed: false,

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

        alert("Please enter a task");

        return;
    }

    let selectedDay = selectedDate.value;

    // SAVE TO FIREBASE
    await saveTaskToFirebase(inputBox.value, selectedDay);

    // CLEAR INPUT
    inputBox.value = "";

    // RELOAD TASKS
    loadTasksByDate();
}


// LOAD TASKS
async function loadTasksByDate(){

    // CLEAR UI
    listContainer.innerHTML = "";

    // GET FIREBASE DATA
    const querySnapshot = await getDocs(collection(db, "tasks"));

    querySnapshot.forEach((firebaseDoc) => {

        const data = firebaseDoc.data();

        // FILTER DATE
        if(data.taskDate === selectedDate.value){

            // CREATE TASK
            let li = document.createElement("li");

            li.innerHTML = data.task;

            // STORE FIREBASE ID
            li.setAttribute("data-id", firebaseDoc.id);

            // COMPLETED STATUS
            if(data.completed){

                li.classList.add("checked");
            }

            // DELETE BUTTON
            let span = document.createElement("span");

            span.innerHTML = "\u00d7";

            li.appendChild(span);

            // ADD TO UI
            listContainer.appendChild(li);
        }
    });
}


// CHECK / DELETE
listContainer.addEventListener("click", async function(e){

    // CHECK TASK
    if(e.target.tagName === "LI"){

        e.target.classList.toggle("checked");

        // FIREBASE DOC ID
        let docId = e.target.getAttribute("data-id");

        // UPDATE FIREBASE
        await updateDoc(doc(db, "tasks", docId), {

            completed: e.target.classList.contains("checked")
        });
    }

    // DELETE TASK
    else if(e.target.tagName === "SPAN"){

        let li = e.target.parentElement;

        let docId = li.getAttribute("data-id");

        // DELETE FROM FIREBASE
        await deleteDoc(doc(db, "tasks", docId));

        // REMOVE FROM UI
        li.remove();
    }

}, false);


// FIRST LOAD
loadTasksByDate();


// GLOBAL FUNCTION
window.addTask = addTask;