import "./style.css";
import {
  changeView,
  displayTasks,
  hideDetails,
  showDetails,
  addProjOption,
  showAllProjects,
} from "./read";
import { createProject } from "./create";
import { taskFunctions, standardDateFormat, projectFunctions } from "./common";
import { deleteProject, deleteTask } from "./delete";
import { completeTask } from "./update";
import {
  showInputPopup,
  checkInputs,
  checkProjSelection,
  addProject,
} from "./inputs";

(() => {
  taskFunctions.setTasks(JSON.parse(localStorage.getItem("taskList")) || []);
  projectFunctions.setProjects(
    JSON.parse(localStorage.getItem("projList")) || []
  );
  displayTasks(taskFunctions.getTasks());
  showAllProjects();
  addProjOption();
})();

(() => {
  const today = standardDateFormat([
    new Date().getMonth() + 1,
    new Date().getDate(),
    new Date().getFullYear(),
  ]);
  document.querySelector(".today").textContent = today;
})();

(() => {
  document.querySelectorAll(".nav-all+ul>li").forEach((item) => {
    item.addEventListener("click", () => changeView(item));
  });

  document.querySelectorAll(".newTask").forEach((item) => {
    item.addEventListener("click", showInputPopup);
  });

  document.querySelector(".addProject").addEventListener("click", addProject);

  document.querySelector(".popup button").addEventListener("click", () => {
    checkInputs("create");
  });

  document.getElementById("edit").addEventListener("click", () => {
    const id = document.getElementById("edit").getAttribute("data-id");
    checkInputs("edit", id);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-container")) {
      document.querySelector(".popup-container").style.display = "none";
    }
    if (
      !e.target.classList.contains("done") &&
      !e.target.classList.contains("addProject")
    ) {
      if (document.querySelector(".projInput"))
        document.querySelector(".projInput").remove();
    }
  });

  document
    .getElementById("project")
    .addEventListener("change", checkProjSelection);

  document.querySelectorAll("main select").forEach((item) => {
    item.addEventListener("change", () =>
      changeView(document.querySelector(".current-view"))
    );
  });

  document.querySelector(".nav-proj+ul").addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
      if (e.target.classList.contains("done")) {
        const newProjName = e.target.previousElementSibling.value;
        if (newProjName !== "") createProject(newProjName);
      } else changeView(e.target.parentNode);
    }
  });

  document.querySelector(".nav-proj+ul").addEventListener("keypress", (e) => {
    if (e.target.tagName === "INPUT") {
      if (e.key === "Enter" && e.target.value !== "")
        createProject(e.target.value);
    }
  });

  document.querySelector(".sidebar").addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash")) {
      deleteProject(e.target.parentNode);
    }
  });

  document.querySelector(".list ul").addEventListener("click", (e) => {
    if (
      e.target.classList.contains("fa-circle") ||
      e.target.classList.contains("fa-circle-check")
    ) {
      completeTask(e.target.parentNode);
    } else if (e.target.classList.contains("fa-trash")) {
      deleteTask(e.target.parentNode);
    } else if (e.target.tagName === "SPAN") {
      if (e.target.textContent === "Edit") {
        const id =
          e.target.parentNode.parentNode.parentNode.getAttribute("data-id");
        showInputPopup(id);
      } else if (e.target.textContent === "Hide") {
        hideDetails(e.target.parentNode.parentNode.parentNode);
      } else {
        showDetails(e.target.parentNode.parentNode);
      }
    }
  });
})();
