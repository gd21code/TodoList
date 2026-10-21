// dom manip that inserts project button
// into project container
const projectContainer = document.querySelector('.project-container');
const projectNameInput = document.querySelector('#proj-name');
const projectForm = document.querySelector('#projectForm');
const projectDialog = document.querySelector('#projectDialog');

projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectDiv = document.createElement('div');

    const projectBtn = document.createElement('button');
    projectBtn.classList.add('project-btn');
    projectDiv.appendChild(projectBtn);

    projectBtn.textContent = projectNameInput.value;
    projectContainer.appendChild(projectBtn);

    projectForm.reset();
    projectDialog.close();
});