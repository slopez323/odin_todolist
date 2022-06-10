import { taskFunctions, projectFunctions, standardDateFormat } from './common';

const hideDetails = (element) => {
  const details = element.querySelector('.details');
  details.style.display = 'none';
};

const setupDetails = (element) => {
  const tasks = taskFunctions.getTasks();
  const taskId = element.getAttribute('data-id');
  const taskDetails = tasks.find((task) => task.id === Number(taskId));

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('details');

  const project = document.createElement('p');
  const projLabel = document.createElement('span');
  const projText = document.createElement('span');
  projText.classList.add('detail-text');
  project.append(projLabel, projText);

  const desc = document.createElement('p');
  const descLabel = document.createElement('span');
  const descText = document.createElement('span');
  descText.classList.add('detail-text');
  desc.append(descLabel, descText);

  const priority = document.createElement('p');
  const prioLabel = document.createElement('span');
  const prioText = document.createElement('span');
  prioText.classList.add('detail-text');
  priority.append(prioLabel, prioText);

  const notes = document.createElement('p');
  const notesLabel = document.createElement('span');
  const notesText = document.createElement('span');
  notesText.classList.add('detail-text');
  notes.append(notesLabel, notesText);

  const actions = document.createElement('p');
  actions.classList.add('detail-actions');

  const edit = document.createElement('span');
  edit.textContent = 'Edit';

  const hide = document.createElement('span');
  hide.textContent = 'Hide';

  projLabel.textContent = 'Project';
  descLabel.textContent = 'Description';
  prioLabel.textContent = 'Priority';
  notesLabel.textContent = 'Notes';

  projText.textContent = taskDetails.projectName;
  descText.textContent = taskDetails.description;
  prioText.textContent = taskDetails.priority.toUpperCase();
  notesText.textContent = taskDetails.notes;

  actions.append(edit, hide);
  detailsDiv.append(project, desc, priority, notes, actions);
  element.append(detailsDiv);
};

const showDetails = (element) => {
  if (!element.querySelector('.details')) setupDetails(element);

  const details = element.querySelector('.details');
  details.style.display = 'block';
};

const displayTasks = (taskList) => {
  const list = document.querySelector('main ul');
  list.innerHTML = '';

  if (taskList.length === 0) {
    document.querySelector('.no-tasks').style.display = 'flex';
    document.querySelector('.list').style.display = 'none';
  } else {
    document.querySelector('.no-tasks').style.display = 'none';
    document.querySelector('.list').style.display = 'block';
    taskList.forEach((task) => {
      const newItem = document.createElement('li');
      const titleDiv = document.createElement('div');
      const text = document.createElement('span');
      const itemDue = document.createElement('span');
      const checkBox = document.createElement('i');
      const trash = document.createElement('i');

      if (task.status === 'open') {
        checkBox.classList.add('fa', 'fa-regular', 'fa-circle');
      } else {
        checkBox.classList.add('fa', 'fa-solid', 'fa-circle-check', 'completed');
      }

      trash.classList.add('fa', 'fa-solid', 'fa-trash');

      newItem.classList.add(task.priority);
      newItem.setAttribute('data-id', task.id);

      text.textContent = task.title;
      titleDiv.classList.add('list-title');

      itemDue.classList.add('list-due', task.priority);
      itemDue.textContent = standardDateFormat(task.dueDate);

      titleDiv.append(checkBox, text, itemDue, trash);
      newItem.append(titleDiv);
      list.append(newItem);
    });
  }
};

const sortTasks = () => {
  const sort = document.getElementById('sort').value;
  const tasks = taskFunctions.getTasks();

  document.getElementById('sort').style.cssText = 'color: #a26769; font-weight: bold';

  if (sort === 'asc') {
    return tasks.sort((task1, task2) => new Date(task1.dueDate.join('/')) - new Date(task2.dueDate.join('/')));
  } if (sort === 'desc') {
    return tasks.sort((task1, task2) => new Date(task2.dueDate.join('/')) - new Date(task1.dueDate.join('/')));
  }
  document.getElementById('sort').style.cssText = '';
  return tasks;
};

const prioTasks = (sorted) => {
  const filter = document.getElementById('filter').value.substr(6);
  const copy = sorted.slice();
  const filtered = copy.filter((task) => task.priority === filter);

  document.getElementById('filter').style.cssText = 'color: #a26769; font-weight: bold';

  if (filtered.length === 0) {
    document.getElementById('filter').value = 'default';
    document.getElementById('filter').style.cssText = '';
    return sorted;
  }
  return filtered;
};

const showCompletedTasks = (taskList) => {
  const tasks = taskFunctions.getTasks();
  const origFiltered = tasks.filter((task) => task.status === 'completed');
  const filtered = taskList.filter((task) => task.status === 'completed');
  if (filtered.length === 0 && origFiltered.length > 0) {
    displayTasks(origFiltered);
    document.getElementById('filter').value = 'default';
  } else {
    displayTasks(filtered);
  }
};

const showOpenTasks = (taskList) => {
  const tasks = taskFunctions.getTasks();
  const origFiltered = tasks.filter((task) => task.status === 'open');
  const filtered = taskList.filter((task) => task.status === 'open');
  if (filtered.length === 0 && origFiltered.length > 0) {
    displayTasks(origFiltered);
    document.getElementById('filter').value = 'default';
  } else {
    displayTasks(filtered);
  }
};

const showProjectTasks = (proj, taskList) => {
  const tasks = taskFunctions.getTasks();
  const origFiltered = tasks.filter((task) => task.projectID === proj);
  const filtered = taskList.filter((task) => task.projectID === proj);
  if (filtered.length === 0 && origFiltered.length > 0) {
    displayTasks(origFiltered);
    document.getElementById('filter').value = 'default';
  } else {
    displayTasks(filtered);
  }
};

const showAllProjects = () => {
  const projects = projectFunctions.getProjects();
  const list = document.querySelector('.nav-proj+ul');
  list.innerHTML = '';

  if (projects.length > 0) {
    projects.forEach((project, index) => {
      const newProjItem = document.createElement('li');
      const projName = document.createElement('span');
      projName.textContent = project;
      newProjItem.setAttribute('id', `view-proj${index}`);
      const trash = document.createElement('i');
      trash.classList.add('fa', 'fa-solid', 'fa-trash');

      newProjItem.append(projName, trash);
      list.append(newProjItem);
    });
  }
};

const addProjOption = () => {
  const projects = projectFunctions.getProjects();
  const options = document.getElementById('project');
  const addOption = document.querySelector('option[value="newProject"');

  while (options.querySelectorAll('option').length > 1) options.querySelector('option').remove();

  projects.forEach((project, index) => {
    const newOption = document.createElement('option');
    newOption.setAttribute('value', `proj${index}`);
    newOption.textContent = project;
    options.insertBefore(newOption, addOption);
  });
};

const projUpdate = () => {
  let latestView = document.querySelector('.current-view').id;

  showAllProjects();
  addProjOption();

  if (!document.querySelector('.current-view')) latestView = 'view-all';
  document.querySelector(`#${latestView} span`).click();
};

const changeView = (element) => {
  document.querySelectorAll('.sidebar li').forEach((x) => x.classList.remove('current-view'));
  element.classList.add('current-view');

  const sorted = sortTasks();
  const filtered = prioTasks(sorted);

  const current = element.id;
  if (current.substr(5, 4) === 'proj') {
    showProjectTasks(current.substr(5), filtered);
  } else if (current.substr(5) === 'all') {
    displayTasks(filtered);
  } else if (current.substr(5) === 'comp') {
    showCompletedTasks(filtered);
  } else if (current.substr(5) === 'open') {
    showOpenTasks(filtered);
  }
};

export {
  changeView,
  displayTasks,
  showDetails,
  hideDetails,
  projUpdate,
  addProjOption,
  showAllProjects,
};
