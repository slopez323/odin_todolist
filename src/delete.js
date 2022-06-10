import { taskFunctions, projectFunctions } from "./common";
import { projUpdate } from "./read";

const deleteTask = (element) => {
  const tasks = taskFunctions.getTasks();
  const id = element.parentNode.getAttribute("data-id");
  const currentTask = tasks.findIndex((task) => task.id === Number(id));

  tasks.splice(currentTask, 1);
  taskFunctions.setTasks(tasks);

  const latestView = document.querySelector(".current-view").id;
  document.querySelector(`#${latestView} span`).click();
};

const deleteProject = (element) => {
  const tasks = taskFunctions.getTasks();
  const projects = projectFunctions.getProjects();
  const projName = element.textContent;
  const index = projects.findIndex((project) => project === projName);

  projects.splice(index, 1);
  projectFunctions.setProjects(projects);

  const updatedTasks = tasks.filter((task) => task.projectName !== projName);
  taskFunctions.setTasks(updatedTasks);

  projUpdate();
};

export { deleteTask, deleteProject };
