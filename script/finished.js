const mainContainer = document.getElementById('mid')

function checkEmptyFinished() {
    const finished = JSON.parse(localStorage.getItem("finished"))
    if (finished === null || finished.length === 0) {
        mainContainer.innerHTML = "There is no currently no finished task! Please consider taking your first step."
        mainContainer.style.color = "white"
    } else {
        createTaskBoxes()
    }
}

function createTaskBoxes() {
    const finished = JSON.parse(localStorage.getItem("finished"))
    
    mainContainer.innerHTML = '';

    const taskLeftDiv = document.createElement('div')
    taskLeftDiv.id = "taskLeftDiv"
    taskLeftDiv.innerHTML = `Current number of finished tasks: ${finished.length}`
    taskLeftDiv.style.color = "red"
    mainContainer.appendChild(taskLeftDiv)

    for (let i = 0; i < finished.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = `task_box ${finished[i].id}`;

        const name = finished[i].name;
        const priority = finished[i].priority.toUpperCase();
        const due = finished[i].due;
        const created_at = finished[i].created_at;

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

        const revive_btn = document.createElement('button');
        revive_btn.innerHTML = 'Revive';
        revive_btn.className = 'revive_btn';

        const delete_btn = document.createElement('button');
        delete_btn.innerHTML = 'Delete';
        delete_btn.className = 'delete_btn';

        newDiv.appendChild(name_p);
        newDiv.appendChild(priority_p);
        newDiv.appendChild(due_p);
        newDiv.appendChild(created_at_p);
        newDiv.appendChild(revive_btn);
        newDiv.appendChild(delete_btn);

        mainContainer.appendChild(newDiv)
    }
}




// INITIALIZATION
checkEmptyFinished()