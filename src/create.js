import { taskFunctions, projectFunctions } from "./common";
import { addProjOption, projUpdate } from "./read";

function Task(projId, projName, title, desc, due, prio, notes, status) {
  const taskList = taskFunctions.getTasks();

  this.projectID = projId;
  this.projectName = projName;
  this.title = title;
  this.description = desc;
  this.dueDate = due;
  this.priority = prio;
  this.notes = notes;
  this.status = status;
  this.id = taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
}

const createProject = (name) => {
  const projects = projectFunctions.getProjects();
  projectFunctions.setProjects([...projects, name]);

  addProjOption();

  if (document.querySelector(".projInput"))
    document.querySelector(".projInput").remove();
  projUpdate();
};

const createTask = () => {
  const projSelect = document.getElementById("project");
  let projId = projSelect.value;
  let projName;

  if (projId === "newProject") {
    const name = document.getElementById("newProjInput").value;
    createProject(name);
    projName = name;
    projUpdate();

    const projectOptions = document.querySelectorAll("#project option");
    projId = projectOptions[projectOptions.length - 2].getAttribute("value");
  } else {
    projName = projSelect.options[projSelect.selectedIndex].textContent;
  }

  const title = document.querySelector("#title").value;
  const desc = document.querySelector("#desc").value;
  const due = document.querySelector("#due").value;
  const prio = document.querySelector("#prio").value;
  const notes = document.querySelector("#notes").value;

  const dueFormatted = [
    due.split("-")[1],
    due.split("-")[2],
    due.split("-")[0],
  ];

  const newTask = new Task(
    projId,
    projName,
    title,
    desc,
    dueFormatted,
    prio,
    notes,
    "open"
  );
  const currentTasks = taskFunctions.getTasks();
  taskFunctions.setTasks([...currentTasks, newTask]);

  document.querySelector(".popup-container").style.display = "none";

  const latestView = document.querySelector(".current-view");
  if (latestView.id.startsWith("view-proj")) {
    latestView.querySelector("span").click();
  } else {
    document.querySelector("#view-all span").click();
  }
};

export { createTask, createProject };
