import { projUpdate, tasks } from "./read";
import { projects, storeProjects } from "./projects";
import { storeTasks } from "./create";

const deleteTask = (element) => {
    const id = element.parentNode.getAttribute('data-id');
    const currentTask = tasks.findIndex(task => task.id == id);
    
    tasks.splice(currentTask, 1);
    storeTasks();

    const latestView = document.querySelector('.current-view').id;
    document.querySelector(`#${latestView} span`).click();
};

const deleteProject = (element) => {
    const projName = element.textContent;
    const index = projects.findIndex(project => project == projName);

    projects.splice(index, 1);
    storeProjects();

    tasks = tasks.filter(task => task.projectName != projName);
    storeTasks();

    projUpdate();
};

export { deleteTask, deleteProject };