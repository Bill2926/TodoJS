const mainContainer = document.getElementById('mid');
const modalContainer = document.getElementById('modal');
const noModalBtn = document.getElementById('no');
const yesModalBtn = document.getElementById('yes');
const modalContentText = document.getElementById('modal_content_text');
let selectedTask;
let currentProcess;
let isMultipleMode = false;
const confirmBtn = document.createElement('button');
confirmBtn.id = 'mutipleConfirmBtn';
confirmBtn.innerHTML = 'confirm';
let tasksArr = [];


function getTodoList() {
    return JSON.parse(localStorage.getItem("todo")) || [];
}

function getFinishedList() {
    return JSON.parse(localStorage.getItem("finished")) || [];
}

function saveTodoList(todo) {
    localStorage.setItem("todo", JSON.stringify(todo));
}

function saveFinishedList(finished) {
    localStorage.setItem("finished", JSON.stringify(finished));
}

function checkEmptyTodo() {
    const todo = getTodoList()
    if (todo == null || todo.length === 0) {
        mainContainer.innerHTML = "Great job! There is no task for now.";
        mainContainer.style.color = "white";
    } else {
        createTaskBoxes()
    }
}

function createTaskBoxes() {
    const todo = getTodoList()
    mainContainer.innerHTML = '';

    const taskLeftDiv = document.createElement('div')
    taskLeftDiv.id = "taskLeftDiv"
    taskLeftDiv.innerHTML = `Current number of tasks: ${todo.length}`
    mainContainer.appendChild(taskLeftDiv)
    createToggleButton(mainContainer)

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
}

function modalContentDisplay(type) {
    modalContentText.innerHTML = ''
    const typeTitle = document.createElement('h2')
    const paragraphModal = document.createElement('p')
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

function handleTasks(e) {    
    if (e.target == yesModalBtn && currentProcess == 'del') {
        const todo = getTodoList()
        const i = todo.findIndex(task => task.id === selectedTask.classList[1])
        // splice: from the index 'i', pop an item out (which is 'i' itself)
        todo.splice(i, 1)
        saveTodoList(todo)
        modalContainer.style.display = "none"
        selectedTask = null
        checkEmptyTodo()
    } else if (e.target == yesModalBtn && currentProcess == 'fin') {
        markDoneTask()
        modalContainer.style.display = "none"
        checkEmptyTodo()
    }
}

function markDoneTask() {
    const todo = getTodoList()
    const i = todo.findIndex(task => task.id === selectedTask.classList[1])
    // splice returns an array, so here i need to only take the first item of that array
    // else when i push back in, i will get array in array
    let finishedTask = todo.splice(i, 1)[0]

    const finished = getFinishedList()
    finished.push(finishedTask)
    // update both finished arr and todo arr
    saveTodoList(todo)
    saveFinishedList(finished)
    selectedTask = null
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

function createToggleButton(parentElement) {
    // Create container
    const container = document.createElement('div');
    container.className = 'toggle-container';

    const description = document.createElement('p');
    description.id = 'toggleDescription';
    description.innerHTML = 'Click me for multiple marking tasks';
    
    // Create toggle switch label
    const label = document.createElement('label');
    label.className = 'toggle-switch';
    
    // Create checkbox input
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'toggleBtn';
    
    // Create slider span
    const slider = document.createElement('span');
    slider.className = 'slider';
    
    // Assemble the toggle switch
    label.appendChild(input);
    label.appendChild(slider);
    
    // Assemble the container
    container.appendChild(description);
    container.appendChild(label);
    
    // Append to parent element
    parentElement.appendChild(container);
    
    input.addEventListener('change', trackMultipleMode)
    return input;
}

function handleMultipleSelection(e) {
    if (e.target.classList.contains('task_box')) {
        // add the new style class so i can revert later
        e.target.classList.add('multipleSelectedStyle')
        tasksArr.push(e.target)
    }
}

function delayMarkDone(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}

async function processMultipleDone() {
    for (task of tasksArr) {
        selectedTask = task
        selectedTask.classList.add('fade-out-animation')
        await delayMarkDone(1000)
        markDoneTask()
    }
    tasksArr.splice(0)
    checkEmptyTodo()
}

confirmBtn.onclick = function() {
    processMultipleDone()
}

noModalBtn.onclick = function() {
    modalContainer.style.display = "none";
}

modalContainer.addEventListener("click", (e) => {    
    if (e.target == modalContainer) {
        modalContainer.style.display = "none";
    }
})

function trackMultipleMode(e) {
    isMultipleMode = e.target.checked
    
    if (isMultipleMode === true) {
        mainContainer.addEventListener('click', handleMultipleSelection)
        mainContainer.appendChild(confirmBtn)
    } else if (isMultipleMode === false) {
        const boxList = mainContainer.querySelectorAll('.task_box')
        boxList.forEach(item => item.classList.remove('multipleSelectedStyle'))
        mainContainer.removeEventListener('click', handleMultipleSelection)
        mainContainer.removeChild(confirmBtn)
        tasksArr.splice(0)
    }
}

modalContainer.addEventListener('click', handleTasks);
mainContainer.addEventListener("click", showModals);

// INITIALIZATION
checkEmptyTodo()