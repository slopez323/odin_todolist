import { taskFunctions, projectFunctions, inputDateFormat } from "./common";
import { createTask } from "./create";
import { updateTask } from "./update";

const checkProjSelection = () => {
  if (document.getElementById("project").value === "newProject") {
    document.querySelector('label[for="project"]').classList.add("showField");
    document.getElementById("newProjInput").classList.add("showField");
    document.getElementById("newProjInput").focus();
  } else {
    document
      .querySelector('label[for="project"]')
      .classList.remove("showField");
    document.getElementById("newProjInput").classList.remove("showField");
  }
};

const showInputPopup = (id) => {
  document.querySelector(".popup-container").style.display = "block";
  const tasks = taskFunctions.getTasks();
  const projects = projectFunctions.getProjects();

  if (typeof id === "object") {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("notes").value = "";
    document.getElementById("prio").value = "high";
    document.getElementById("newProjInput").value = "";
    document.getElementById("due").value = inputDateFormat(
      new Date().toLocaleDateString().split("/")
    );

    if (document.querySelector(".current-view").id.substr(5, 4) === "proj") {
      const projSelect = document.querySelector(".current-view").id.substr(5);
      document.getElementById("project").value = projSelect;
    } else if (tasks.length > 0) {
      const projId = tasks.map((task) => task.projectID);
      const latest = projId.sort();

      document.getElementById("project").value = latest[latest.length - 1];
    } else if (projects.length > 0) {
      const projSelect = document.getElementById("project");
      const projOptions = projSelect.querySelectorAll("option");
      const latestProj = projOptions[projOptions.length - 2];

      projSelect.value = latestProj.getAttribute("value");
    }
    document.querySelector(".popup button").style.display = "block";
    document.getElementById("edit").style.display = "none";
    document.getElementById("edit").removeAttribute("data-id");
  } else {
    const entry = tasks.find((task) => task.id === Number(id));
    document.getElementById("title").value = entry.title;
    document.getElementById("desc").value = entry.description;
    document.getElementById("notes").value = entry.notes;
    document.getElementById("project").value = entry.projectID;
    document.getElementById("prio").value = entry.priority;
    document.getElementById("due").value = inputDateFormat(entry.dueDate);

    document.querySelector(".popup button").style.display = "none";
    document.getElementById("edit").style.display = "block";
    document.getElementById("edit").setAttribute("data-id", id);
  }

  document.getElementById("title").classList.remove("missing");
  document.getElementById("newProjInput").classList.remove("missing");

  checkProjSelection();
};

const checkInputs = (type, id) => {
  const projInput = document.getElementById("newProjInput");
  const title = document.getElementById("title");

  projInput.classList.remove("missing");
  title.classList.remove("missing");

  if (
    (projInput.classList.contains("showField") && projInput.value === "") ||
    title.value === ""
  ) {
    if (projInput.classList.contains("showField") && projInput.value === "") {
      projInput.classList.add("missing");
    }
    if (title.value === "") {
      title.classList.add("missing");
    }
    return;
  }

  if (type === "create") {
    createTask();
  } else {
    updateTask(id);
  }
};

const addProject = () => {
  const newProj = document.createElement("li");
  newProj.classList.add("projInput");
  const newProjName = document.createElement("input");
  const done = document.createElement("span");
  done.textContent = "✔︎";
  done.classList.add("done");

  newProj.append(newProjName, done);
  document.querySelector(".nav-proj+ul").append(newProj);
  newProjName.focus();
};

export { showInputPopup, checkInputs, addProject, checkProjSelection };
