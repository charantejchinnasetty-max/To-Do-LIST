import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// SAVE DATA
async function saveTask(taskText) {
  try {
    await addDoc(collection(db, "tasks"), {
      task: taskText,
      created: new Date()
    });

    alert("Task Saved!");
  } catch (error) {
    console.log(error);
  }
}

// EXAMPLE BUTTON
document.getElementById("addBtn").addEventListener("click", () => {
  let task = document.getElementById("taskInput").value;

  saveTask(task);
});

// SHOW DATA
async function loadTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));

  querySnapshot.forEach((doc) => {
    console.log(doc.data());
  });
}

loadTasks();
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

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
        saveData()


    }
    inputBox.value = "";
}

    listContainer.addEventListener("click", function(e){
        if (e.target.tagName === "LI"){
            e.target.classList.toggle("checked");
            saveData()

        }
        else if(e.target.tagName ==="SPAN"){
            e.target.parentElement.remove();
            saveData()
        }

    },false);

    function saveData(){
        localStorage.setItem("data",listContainer.innerHTML);

    }

    function showData(){
        listContainer.innerHTML = localStorage.getItem("data");
    }

    showData();

