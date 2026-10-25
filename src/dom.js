// dom manip that inserts project button into project container
const projectContainer = document.querySelector('.project-container');
const projectNameInput = document.querySelector('#proj-name');
const projectForm = document.querySelector('#projectForm');
const projectDialog = document.querySelector('#projectDialog');
const mainArea = document.querySelector('.main');
const taskForm = document.querySelector('#taskForm');
const taskDialog = document.querySelector('#taskDialog');

let activeProject = null;
let taskEdit = null;

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project-block');

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project-btn');
    projectBtn.textContent = projectNameInput.value;

    projectDiv.appendChild(projectBtn);
    projectContainer.appendChild(projectDiv);

    // delete button for projects
    const deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.classList.add('delete-project-btn');
    deleteProjectBtn.textContent = 'Delete';
    projectDiv.appendChild(deleteProjectBtn);

    // delete project functionality
    deleteProjectBtn.addEventListener('click', () => {
        mainArea.innerHTML = '';
        projectDiv.remove();
    });

    // creating todo array for each button
    projectBtn.todos = [];

    // showcase project in main area
    projectBtn.addEventListener('click', () => {
        displayProjectTasks(projectBtn);
    });
 
    projectForm.reset();
    projectDialog.close();
});

// display task code goes here
function displayProjectTasks(projectBtn) {
    activeProject = projectBtn;
    mainArea.innerHTML = '';
        
    const projectHeader = document.createElement('div');
    projectHeader.classList.add('project-btn-header');
    projectHeader.textContent = projectBtn.textContent;
    mainArea.appendChild(projectHeader);

    // add "add Task" button here
    const addTaskBtn = document.createElement('button');
    addTaskBtn.textContent = 'Add Task';
    addTaskBtn.classList.add('task-button');
    projectHeader.appendChild(addTaskBtn);

    // todo list container
    const projectTodoList = document.createElement('div');
    projectTodoList.classList.add('todo-list');
    mainArea.appendChild(projectTodoList);

    // render other tasks added to array
    projectBtn.todos.forEach(task => {
        taskDisplay(task, projectTodoList, projectBtn);
    });

    // when "add task" button is clicked, open task dialog
    addTaskBtn.addEventListener('click', () => {
        openTaskDialog();
    });
};

function openTaskDialog() {
    const taskDialog = document.querySelector('#taskDialog');
    taskDialog.showModal();
};

// task display
function taskDisplay(task, taskContainer, project) {
    
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-block');

    const taskName = document.createElement('span');
    taskName.textContent = `Task: ${task.title}`;

    const taskDescription = document.createElement('span');
    taskDescription.textContent = `Description: ${task.description}`;

    const taskDueDate = document.createElement('span');
    taskDueDate.textContent = `Due: ${task.dueDate}`;

    const taskPriority = document.createElement('span');
    taskPriority.textContent = `Priority: ${task.priority}`;

    // completion checkbox here
    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('task-complete');
    const checkBoxLabel = document.createElement('label');
    const checkBox = document.createElement('input');

    checkBoxLabel.htmlFor = 'taskCheckbox';
    checkBoxLabel.textContent = 'Complete?';

    checkBox.type = 'checkbox';
    checkBox.id = 'taskCheckbox';

    checkBoxDiv.appendChild(checkBoxLabel);
    checkBoxDiv.appendChild(checkBox);

    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            taskName.style.textDecoration = 'line-through';
            taskDescription.style.textDecoration = 'line-through';
            taskDueDate.style.textDecoration = 'line-through';
            taskPriority.style.textDecoration = 'line-through';
        } else {
            taskName.style.textDecoration = 'none';
            taskDescription.style.textDecoration = 'none';
            taskDueDate.style.textDecoration = 'none';
            taskPriority.style.textDecoration = 'none';
        }
    });

    // edit task button
    const editTaskBtn = document.createElement('button');
    editTaskBtn.textContent = 'Edit';
    editTaskBtn.classList.add('edit-task-btn');

    // edit task functionality
    editTaskBtn.addEventListener('click', () => {
        taskEdit = task;

        document.querySelector('#title').value = task.title;
        document.querySelector('#description').value = task.description;
        document.querySelector('#dueDate').value = task.dueDate;
        document.querySelector('#priority').value = task.priority;

        taskDialog.showModal();
    });

    // task delete button
    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.textContent = 'Delete';
    deleteTaskBtn.classList.add('delete-task-btn');

    // task delete button functionality
    deleteTaskBtn.addEventListener('click', () => {
        const taskIndex = project.todos.indexOf(task);
        if (taskIndex > -1) {
            project.todos.splice(taskIndex, 1);
        };
        taskDiv.remove();
    });

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskDescription);
    taskDiv.appendChild(taskDueDate);
    taskDiv.appendChild(taskPriority);
    taskDiv.appendChild(checkBoxDiv);
    taskDiv.appendChild(editTaskBtn);
    taskDiv.appendChild(deleteTaskBtn);

    taskContainer.appendChild(taskDiv);

    // function to update task after creation
    task.updateTask = function() {
        taskName.textContent = `Task: ${task.title}`;
        taskDescription.textContent = `Description: ${task.description}`;
        taskDueDate.textContent = `Due: ${task.dueDate}`;
        taskPriority.textContent = `Priority: ${task.priority}`;
    };
};

// task form submission
taskForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;

    if (taskEdit) {
        taskEdit.title = title;
        taskEdit.description = description;
        taskEdit.dueDate = dueDate;
        taskEdit.priority = priority;

        // new text display
        if (typeof taskEdit.updateTask === 'function') {
            taskEdit.updateTask();
        }

        taskEdit = null;

    } else {
        const newTask = {title, description, dueDate, priority};
        activeProject.todos.push(newTask);

        // places todos into proper project
        const todoContainer = document.querySelector('.todo-list');
        if (todoContainer) {
            taskDisplay(newTask, todoContainer, activeProject);
        };
    }

    taskForm.reset();
    taskDialog.close();
});

// add function for completion true/false
// storage JS file work to be completed