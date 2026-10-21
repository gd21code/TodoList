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

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project-btn');
    projectBtn.textContent = projectNameInput.value;

    // creating todo array for each button
    projectBtn.todos = [];

    projectDiv.appendChild(projectBtn);
    projectContainer.appendChild(projectDiv);

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
}