// dom manip that inserts project button into project container
const projectContainer = document.querySelector('.project-container');
const projectNameInput = document.querySelector('#proj-name');
const projectForm = document.querySelector('#projectForm');
const projectDialog = document.querySelector('#projectDialog');
const mainArea = document.querySelector('.main');
const taskForm = document.querySelector('#taskForm');
const taskDialog = document.querySelector('#taskDialog');

let activeProject = null;

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
    taskDiv.appendChild(deleteTaskBtn);

    taskContainer.appendChild(taskDiv);
};
// task form submission
taskForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;

    const newTask = {title, description, dueDate, priority};
    activeProject.todos.push(newTask);

    // places todos into proper project
    const todoContainer = document.querySelector('.todo-list');
    if (todoContainer) {
        taskDisplay(newTask, todoContainer, activeProject);
    };

    taskForm.reset();
    taskDialog.close();
});