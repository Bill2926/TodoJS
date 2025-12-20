let todo = JSON.parse(localStorage.getItem("todo"));

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
        // due_p.textContent = due;
        due_p.innerHTML = `Due: <span class='due_time'>${due}</span>`;
        due_p.className = 'due';

        const created_at_p = document.createElement('p');
        created_at_p.innerHTML = `Created at: <span class="created_at">${created_at}</span>`;
        created_at_p.className = 'time_created';

        newDiv.appendChild(name_p);
        newDiv.appendChild(priority_p);
        newDiv.appendChild(due_p);
        newDiv.appendChild(created_at_p);

        document.getElementById('mid').appendChild(newDiv);
    };
}