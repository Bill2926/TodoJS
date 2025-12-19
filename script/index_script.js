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

submitTask.onclick = function() {
    let taskName = document.getElementById("index_add_task_input").value;
    if (taskName == "") {
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

    const taskObj = {
        "name": taskName,
        "priority": prior
    };

    // get the current todo array, or an empty one if there is none
    let todo = JSON.parse(localStorage.getItem("todo")) || [];
    // append
    todo.push(taskObj);
    // re-setItem
    localStorage.setItem("tasks", JSON.stringify(tasks));
}