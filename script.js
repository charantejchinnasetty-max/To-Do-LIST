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
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ELEMENTS
const inputBox = document.getElementById("input-box");

const listContainer = document.getElementById("list-container");

const selectedDate = document.getElementById("selectedDate");


// AUTO SET TODAY DATE
let today = new Date().toISOString().split("T")[0];

selectedDate.value = today;


// LOAD TASKS WHEN DATE CHANGES
selectedDate.addEventListener("change", loadTasksByDate);


// SAVE TASK TO FIREBASE
async function saveTaskToFirebase(taskText, taskDate){

    try{

        await addDoc(collection(db, "tasks"), {

            task: taskText,

            taskDate: taskDate,

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

    }
    else{

        let selectedDay = selectedDate.value;

        // CREATE LI
        let li = document.createElement("li");

        li.innerHTML = inputBox.value;

        listContainer.appendChild(li);

        // DELETE BUTTON
        let span = document.createElement("span");

        span.innerHTML = "\u00d7";

        li.appendChild(span);

        // SAVE TO FIREBASE
        await saveTaskToFirebase(inputBox.value, selectedDay);

        inputBox.value = "";
    }
}


// CHECK / DELETE TASK
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


// LOAD TASKS DATE WISE
async function loadTasksByDate(){

    listContainer.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "tasks"));

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        // FILTER DATE
        if(data.taskDate === selectedDate.value){

            let li = document.createElement("li");

            li.innerHTML = data.task;

            // DELETE BUTTON
            let span = document.createElement("span");

            span.innerHTML = "\u00d7";

            li.appendChild(span);

            listContainer.appendChild(li);
        }
    });
}


// FIRST LOAD
loadTasksByDate();


// GLOBAL FUNCTION
window.addTask = addTask;