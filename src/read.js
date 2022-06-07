import { projects, addProjOption, addProjListeners } from "./projects";
import { completeTask, editDetails } from "./update";
import { deleteTask } from "./delete";
import { standardDateFormat } from "./dates";

let tasks = JSON.parse(localStorage.getItem('taskList')) || [];

const startup = () => {
    displayTasks();
    showAllProjects();
    addProjOption();
    addProjListeners();
};

const projUpdate = () => {
    let latestView = document.querySelector('.current-view').id;

    showAllProjects();
    addProjOption();
    addProjListeners();

    if (!document.querySelector('.current-view')) latestView = 'view-all';
    document.querySelector(`#${latestView} span`).click();
};

const addTaskListener = () => {
    document.querySelectorAll('.list-title i:first-child').forEach(item => {
        item.removeEventListener('click', completeTask);
    });
    document.querySelectorAll('.list-title i:last-child').forEach(item => {
        item.removeEventListener('click', deleteTask);
    });
    document.querySelectorAll('.list-title').forEach(item => {
        item.removeEventListener('click', showDetails);
    });

    document.querySelectorAll('.list-title i:first-child').forEach(item => {
        item.addEventListener('click', () => completeTask(item.parentNode));
    });
    document.querySelectorAll('.list-title i:last-child').forEach(item => {
        item.addEventListener('click', () => deleteTask(item.parentNode));
    });
    document.querySelectorAll('.list-title span').forEach(item => {
        item.addEventListener('click', () => showDetails(item.parentNode.parentNode));
    });
};

const setupDetails = (element) => {
    const taskId = element.getAttribute('data-id');
    const taskDetails = tasks.find(task => task.id == taskId);

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
    edit.addEventListener('click', () => editDetails(element));
    const hide = document.createElement('span');
    hide.textContent = 'Hide';
    hide.addEventListener('click', () => { hideDetails(element) });

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
    element.querySelector('.details').style.display = 'block';
};

const hideDetails = (element) => {
    element.querySelector('.details').style.display = 'none';
};

const displayTasks = (taskList) => {
    const list = document.querySelector('main ul');
    list.innerHTML = '';

    if (taskList == null) taskList = tasks;

    if (taskList.length == 0) {
        document.querySelector('.no-tasks').style.display = 'flex';
        document.querySelector('.list').style.display = 'none';
    } else {
        document.querySelector('.no-tasks').style.display = 'none';
        document.querySelector('.list').style.display = 'block';
        taskList.forEach(task => {
            const newItem = document.createElement('li');
            const titleDiv = document.createElement('div');
            const text = document.createElement('span');
            const itemDue = document.createElement('span');
            const checkBox = document.createElement('i');
            const trash = document.createElement('i');

            if (task.status == 'open') {
                checkBox.classList.add('fa', 'fa-regular', 'fa-circle');
            } else {
                checkBox.classList.add('fa', 'fa-solid', 'fa-circle-check', 'completed');
            };

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
        addTaskListener();
    };
};

const showAllProjects = () => {
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
    };
};

const changeView = (element) => {
    document.querySelectorAll('.sidebar li').forEach(x => x.classList.remove('current-view'));
    element.classList.add('current-view');

    const sorted = sortTasks();
    const filtered = prioTasks(sorted);

    const current = element.id;
    if (current.substr(5, 4) == 'proj') {
        showProjectTasks(current.substr(5), filtered);
    } else if (current.substr(5) == 'all') {
        displayTasks(filtered);
    } else if (current.substr(5) == 'comp') {
        showCompletedTasks(filtered);
    } else if (current.substr(5) == 'open') {
        showOpenTasks(filtered);
    };
};

const showCompletedTasks = (taskList) => {
    const origFiltered = tasks.filter(task => task.status == 'completed');
    const filtered = taskList.filter(task => task.status == 'completed');
    if (filtered.length == 0 && origFiltered.length > 0) {
        displayTasks(origFiltered);
        document.getElementById('filter').value = 'default';
    } else {
        displayTasks(filtered);
    };
};

const showOpenTasks = (taskList) => {
    const origFiltered = tasks.filter(task => task.status == 'open');
    const filtered = taskList.filter(task => task.status == 'open');
    if (filtered.length == 0 && origFiltered.length > 0) {
        displayTasks(origFiltered);
        document.getElementById('filter').value = 'default';
    } else {
        displayTasks(filtered);
    };
};

const showProjectTasks = (proj, taskList) => {
    const origFiltered = tasks.filter(task => task.projectID == proj);
    const filtered = taskList.filter(task => task.projectID == proj);
    if (filtered.length == 0 && origFiltered.length > 0) {
        displayTasks(origFiltered);
        document.getElementById('filter').value = 'default';
    } else {
        displayTasks(filtered);
    };
};

const sortTasks = () => {
    const sort = document.getElementById('sort').value;
    const copy = tasks.slice();

    document.getElementById('sort').style.cssText = 'color: #a26769; font-weight: bold';

    if (sort == 'asc') {
        return copy.sort(task => new Date(task.dueDate.join('/')));
    } else if (sort == 'desc') {
        return copy.sort(task => new Date(task.dueDate.join('/'))).reverse();
    } else {
        document.getElementById('sort').style.cssText = '';
        return tasks;
    };
};

const prioTasks = (sorted) => {
    const filter = document.getElementById('filter').value.substr(6);
    const copy = sorted.slice();
    const filtered = copy.filter(task => task.priority == filter);

    document.getElementById('filter').style.cssText = 'color: #a26769; font-weight: bold';

    if (filtered.length == 0) {
        document.getElementById('filter').value = 'default';
        document.getElementById('filter').style.cssText = '';
        return sorted;
    };
    return filtered;
};

export { tasks, startup, projUpdate, showProjectTasks, changeView };