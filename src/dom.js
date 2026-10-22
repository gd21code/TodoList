// dom manip that inserts project button
// into project container
const projectContainer = document.querySelector('.project-container');
const projectNameInput = document.querySelector('#proj-name');
const projectForm = document.querySelector('#projectForm');
const projectDialog = document.querySelector('#projectDialog');
const mainArea = document.querySelector('.main');

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

    // NEED DELETE BUTTON FUNCTION FOR TASK
    // const deleteTaskBtn = document.createElement('button');
    // deleteTaskBtn.textContent = 'Delete';
    // deleteTaskBtn.classList.add('delete-task-button');

    // todo list container
    const projectTodoList = document.createElement('div');
    projectTodoList.classList.add('todo-list');
    mainArea.appendChild(projectTodoList);

    // display todos of respective project
    

    // add todo to respect project array
}