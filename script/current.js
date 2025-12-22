let todo = JSON.parse(localStorage.getItem("todo"))
const mainContainer = document.getElementById('mid')
const modalContainer = document.getElementById('modal')
const noModalBtn = document.getElementById('no')

if (todo == null) {
    document.getElementById('mid').innerHTML = "There is currently now task. Please consider adding one!";
    document.getElementById('mid').style.color = "white";
} else {createTaskBoxes()}

function createTaskBoxes() {
    for (let i= 0; i < todo.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = 'task_box';

        const name = todo[i].name;
        const priority = todo[i].priority.toUpperCase();
        const due = todo[i].due;
        const created_at = todo[i].created_at;

        const name_p = document.createElement('p');
        name_p.textContent = name;
        name_p.className = 'name';

        const priority_p = document.createElement('p');
        priority_p.textContent = priority;
        priority_p.className = 'priority';

        const due_p = document.createElement('p');
        due_p.innerHTML = `Due: <span class='due_time'>${due}</span>`;
        due_p.className = 'due';

        const created_at_p = document.createElement('p');
        created_at_p.innerHTML = `Created at: <span class="created_at">${created_at}</span>`;
        created_at_p.className = 'time_created';

        const finished_btn = document.createElement('button');
        finished_btn.innerHTML = 'Finish';
        finished_btn.className = 'finished_btn';

        const delete_btn = document.createElement('button');
        delete_btn.innerHTML = 'Delete';
        delete_btn.className = 'delete_btn';

        newDiv.appendChild(name_p);
        newDiv.appendChild(priority_p);
        newDiv.appendChild(due_p);
        newDiv.appendChild(created_at_p);
        newDiv.appendChild(finished_btn);
        newDiv.appendChild(delete_btn);

        document.getElementById('mid').appendChild(newDiv);
    };
}

mainContainer.addEventListener("click", (e) => {
    // if (e.target.className == "delete_btn") {
    //     modalContainer.style.display = "block";
    // }

    // this will handle the situation where class name looks like this
    // <div class="delete_btn new old"></div>
    if (e.target.classList.contains("delete_btn")) {
        modalContainer.style.display = "block";
    }
})

noModalBtn.onclick = function() {
    modalContainer.style.display = "none";
}

modalContainer.addEventListener("click", (e) => {    
    if (e.target == modalContainer) {
        modalContainer.style.display = "none";
    }
})