import { taskFunctions } from './common';
import { createProject } from './create';
import { projUpdate } from './read';

const completeTask = (element) => {
  const tasks = taskFunctions.getTasks();
  const checkBox = element.querySelector('i');
  const id = element.parentNode.getAttribute('data-id');
  const currentTask = tasks.find((task) => task.id === Number(id));

  if (checkBox.classList.contains('completed')) {
    checkBox.classList.remove('fa-solid', 'fa-circle-check', 'completed');
    checkBox.classList.add('fa-regular', 'fa-circle');

    currentTask.status = 'open';
  } else {
    checkBox.classList.remove('fa-regular', 'fa-circle');
    checkBox.classList.add('fa-solid', 'fa-circle-check', 'completed');

    currentTask.status = 'completed';
  }

  taskFunctions.setTasks(tasks);

  const latestView = document.querySelector('.current-view').id;
  document.querySelector(`#${latestView} span`).click();
};

const updateTask = (id) => {
  const tasks = taskFunctions.getTasks();
  const projSelect = document.getElementById('project');
  let projId = projSelect.value;
  let projName;

  if (projId === 'newProject') {
    const name = document.getElementById('newProjInput').value;
    createProject(name);
    projName = name;
    projUpdate();

    const projects = document.querySelectorAll('#project option');
    projId = projects[projects.length - 2].getAttribute('value');
  } else {
    projName = projSelect.options[projSelect.selectedIndex].textContent;
  }

  const title = document.querySelector('#title').value;
  const desc = document.querySelector('#desc').value;
  const due = document.querySelector('#due').value;
  const prio = document.querySelector('#prio').value;
  const notes = document.querySelector('#notes').value;

  const dueFormatted = [due.split('-')[1], due.split('-')[2], due.split('-')[0]];

  const item = tasks.find((task) => task.id === Number(id));
  item.projectID = projId;
  item.projectName = projName;
  item.title = title;
  item.description = desc;
  item.dueDate = dueFormatted;
  item.priority = prio;
  item.notes = notes;

  taskFunctions.setTasks(tasks);
  document.querySelector('.popup-container').style.display = 'none';

  const latestView = document.querySelector('.current-view').id;
  document.querySelector(`#${latestView} span`).click();
};

export { completeTask, updateTask };
