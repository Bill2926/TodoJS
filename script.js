const priorHigh = document.getElementById("high");
const priorMedium = document.getElementById("medium");
const priorLow = document.getElementById("low");
const clickedBtn = document.getElementById("index_button");
let prior;


clickedBtn.onclick = function() {
    let task = document.getElementById("index_add_task_input").value;
    if (task == "") {
        window.alert("U unemployed");
        return;
    }

    if (priorHigh.checked == false && priorMedium.checked == false && priorLow.checked == false) {
        window.alert("Please choose a priority level.")
        return;
    }

    if (priorHigh.checked) {
        prior = "High"
    }
    
    if (priorMedium.checked) {
        prior = "Medium"
    }

    if (priorLow.checked) {
        prior = "Low"
    }

    console.log(`${task} / ${prior}`);
}