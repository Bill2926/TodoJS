const priorHigh = document.getElementById("high");
const priorMedium = document.getElementById("medium");
const priorLow = document.getElementById("low");
const submitTask = document.getElementById("index_button");
let prior;


getCurrentDateTime();
setInterval(getCurrentDateTime, 1000);


function getCurrentDateTime() {
    const now = new Date();
    // padStart(2, "0") means that there will be a 0 before a single digit. ex: 5 seconds -> 05
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById("time_box").innerHTML = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

function convertDueDate() {
    let due = document.getElementById("due_input").value;
    if (due === "") {
        return due = "N/A"
    }else {
        const dueStr = new Date(due);
        const day = String(dueStr.getDate()).padStart(2, '0');
        const month = String(dueStr.getMonth() + 1).padStart(2, '0');
        const year = dueStr.getFullYear();
        
        const due_formated = `${day}/${month}/${year}`;
        return due_formated
    }
}

submitTask.onclick = function() {
    let taskName = document.getElementById("task_input").value;
    if (taskName === "") {
        document.getElementById("error_msg").innerHTML = "Invalid task, please try again.";
        document.getElementById("error_msg").style.color = "red";
        document.getElementById("error_msg").style.marginTop = "10px";
        return;
    }

    if (priorHigh.checked == false && priorMedium.checked == false && priorLow.checked == false) {
        document.getElementById("error_msg").innerHTML = "Please select the task's priority first.";
        return;
    }

    if (priorHigh.checked) {
        prior = "High";
    }else if (priorMedium.checked) {
        prior = "Medium";
    }else if (priorLow.checked) {
        prior = "Low";
    }

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const created_at = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // get the current todo array, or an empty one if there is none
    const todo = JSON.parse(localStorage.getItem("todo")) || [];
    validID = false
    let id;
    while (validID == false) {
        id = assignTaskId(100,999).toString();
        for (let i=0; i < todo.length; i++) {
            if (todo[i].id === id) {
                return
            }
        }
        validID = true
    }

    const taskObj = {
        "id": id,
        "name": taskName,
        "priority": prior,
        "due": convertDueDate(),
        "created_at": created_at,
        "complete": false
    };

    // append
    todo.push(taskObj);
    // re-setItem
    localStorage.setItem("todo", JSON.stringify(todo));
    location.href = 'current.html';
}

function assignTaskId(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}