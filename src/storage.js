function saveProjects() {
    const projectButtons = document.querySelectorAll('.project-btn');
    const projectsData = Array.from(projectButtons).map(btn => ({
        name: btn.textContent,
        todos: btn.todos || []
    }));
    localStorage.setItem('localProjects', JSON.stringify(projectsData));
}

export {saveProjects};