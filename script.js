// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);
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

