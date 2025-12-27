const mainContainer = document.getElementById('mid');
const modalContainer = document.getElementById('modal');
const noModalBtn = document.getElementById('no');
const yesModalBtn = document.getElementById('yes');
const modalContentText = document.getElementById('modal_content_text');
let selectedTask;
let type;
let currentProcess;

function checkEmptyTodo() {
    const todo = JSON.parse(localStorage.getItem("todo"))
    if (todo == null || todo.length === 0) {
        mainContainer.innerHTML = "Great job! There is no task for now.";
        mainContainer.style.color = "white";
    } else {
        createTaskBoxes()
    }
}

function createTaskBoxes() {
    const todo = JSON.parse(localStorage.getItem("todo"))
    
    mainContainer.innerHTML = '';

    const taskLeftDiv = document.createElement('div')
    taskLeftDiv.id = "taskLeftDiv"
    taskLeftDiv.innerHTML = `Current number of tasks: ${todo.length}`
    mainContainer.appendChild(taskLeftDiv)

    for (let i = 0; i < todo.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = `task_box ${todo[i].id}`;

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

        mainContainer.appendChild(newDiv)
    }
    
    const finishInBulk = document.createElement('button');
    finishInBulk.innerHTML = 'Click me to mark finish mutiple tasks';
    finishInBulk.id = 'finishInBulk';
    mainContainer.appendChild(finishInBulk);
}

function modalContentDisplay(type) {
    modalContentText.innerHTML = ''
    typeTitle = document.createElement('h2')
    paragraphModal = document.createElement('p')
    paragraphModal.style.marginTop = "1rem"
    typeTitle.style = "font-family: BBH Hegarty, sans-serif; letter-spacing: 3px;"
    if (type === false) {
        typeTitle.innerHTML = "WARNING!"
        paragraphModal.innerHTML = "You have not finished this task. Still delete ?"
    } else if (type === true) {
        typeTitle.innerHTML = "CONFIRMATION"
        paragraphModal.innerHTML = "You finished this task ? if so, well done ! click yes to conintue"
    }
    modalContentText.appendChild(typeTitle)
    modalContentText.appendChild(paragraphModal)
}

function handleWindowFocus() {
    checkEmptyTodo()
}

function handleTasks(e) {    
    if (e.target == yesModalBtn && currentProcess == 'del') {
        const todo = JSON.parse(localStorage.getItem("todo"))
        const i = todo.findIndex(task => task.id === selectedTask.classList[1])
        // splice: from the index 'i', pop an item out (which is 'i' itself)
        todo.splice(i, 1)
        localStorage.setItem("todo", JSON.stringify(todo));
        modalContainer.style.display = "none"
        selectedTask = null
        checkEmptyTodo()
    } else if (e.target == yesModalBtn && currentProcess == 'fin') {
        const todo = JSON.parse(localStorage.getItem("todo"))
        const i = todo.findIndex(task => task.id === selectedTask.classList[1])
        // splice returns an array, so here i need to only take the first item of that array
        // else when i push back in, i will get array in array
        let finishedTask = todo.splice(i, 1)[0]

        const finished = JSON.parse(localStorage.getItem("finished")) || [];
        finished.push(finishedTask)
        // update both finished arr and todo arr
        localStorage.setItem("finished", JSON.stringify(finished));
        localStorage.setItem("todo", JSON.stringify(todo));
        modalContainer.style.display = "none"
        selectedTask = null
        checkEmptyTodo()
    }
}

function showModals(e) {
    if (e.target.classList.contains("delete_btn")) {
        modalContentDisplay(false)
        modalContainer.style.display = "block"
        selectedTask = e.target.closest('.task_box')
        currentProcess = 'del'
    } else if (e.target.classList.contains("finished_btn")) {
        modalContentDisplay(true)
        modalContainer.style.display = "block"
        selectedTask = e.target.closest('.task_box')
        currentProcess = 'fin'
    }
}

async function finishBulk() {
    // 
}

noModalBtn.onclick = function() {
    modalContainer.style.display = "none";
}

modalContainer.addEventListener("click", (e) => {    
    if (e.target == modalContainer) {
        modalContainer.style.display = "none";
    }
})

window.addEventListener('focus', handleWindowFocus);
modalContainer.addEventListener('click', handleTasks);
mainContainer.addEventListener("click", showModals);

// INITIALIZATION
checkEmptyTodo()