import { projUpdate, tasks } from "./read";
import { checkProjSelection, createProject, projects } from "./projects";
import { updateTask } from "./update";
import { inputDateFormat } from "./dates";

function Task(projId, projName, title, desc, due, prio, notes, status) {
    this.projectID = projId;
    this.projectName = projName;
    this.title = title;
    this.description = desc;
    this.dueDate = due;
    this.priority = prio;
    this.notes = notes;
    this.status = status;
    this.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
};

const showInputPopup = (id) => {
    document.querySelector('.popup-container').style.display = 'block';

    if (typeof id == 'object') {
        document.getElementById('title').value = '';
        document.getElementById('desc').value = '';
        document.getElementById('notes').value = '';
        document.getElementById('newProjInput').value = '';
        document.getElementById('due').value = inputDateFormat(new Date().toLocaleDateString().split('/'));

        if (document.querySelector('.current-view').id.substr(5, 4) == 'proj') {
            const projSelect = document.querySelector('.current-view').id.substr(5);
            document.getElementById('project').value = projSelect;
        } else {
            if (tasks.length > 0) {
                const projId = tasks.map(task => task.projectID);
                const latest = projId.sort();

                document.getElementById('project').value = latest[latest.length - 1];
            } else if (projects.length > 0) {
                const projSelect = document.getElementById('project');
                const projOptions = projSelect.querySelectorAll('option');
                const latestProj = projOptions[projOptions.length - 2];

                projSelect.value = latestProj.getAttribute('value');
            };
        };
        document.querySelector('.popup button').style.display = 'block';
        document.getElementById('edit').style.display = 'none';
        document.getElementById('edit').removeAttribute('data-id');
    } else {
        const entry = tasks.find(task => task.id == id);
        document.getElementById('title').value = entry.title;
        document.getElementById('desc').value = entry.description;
        document.getElementById('notes').value = entry.notes;
        document.getElementById('project').value = entry.projectID;
        document.getElementById('prio').value = entry.priority;
        document.getElementById('due').value = inputDateFormat(entry.dueDate);

        document.querySelector('.popup button').style.display = 'none';
        document.getElementById('edit').style.display = 'block';
        document.getElementById('edit').setAttribute('data-id', id);
    };

    document.getElementById('title').classList.remove('missing');
    document.getElementById('newProjInput').classList.remove('missing');

    checkProjSelection();
};

const storeTasks = () => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
};

const createTask = () => {
    const projSelect = document.getElementById('project');
    let projId = projSelect.value;
    let projName;

    if (projId == 'newProject') {
        const name = document.getElementById('newProjInput').value;
        createProject(name);
        projName = name;
        projUpdate();

        const projects = document.querySelectorAll('#project option');
        projId = projects[projects.length - 2].getAttribute('value');

    } else {
        projName = projSelect.options[projSelect.selectedIndex].textContent;
    };

    const title = document.querySelector('#title').value;
    const desc = document.querySelector('#desc').value;
    const due = document.querySelector('#due').value;
    const prio = document.querySelector('#prio').value;
    const notes = document.querySelector('#notes').value;

    const dueFormatted = [due.split('-')[1], due.split('-')[2], due.split('-')[0]];

    const newTask = new Task(projId, projName, title, desc, dueFormatted, prio, notes, 'open');
    tasks.push(newTask)

    storeTasks();
    document.querySelector('.popup-container').style.display = 'none';

    const latestView = document.querySelector('.current-view');
    if (latestView.id.startsWith('view-proj')) {
        latestView.querySelector('span').click();
    } else {
        document.querySelector('#view-all span').click();
    };
};

const checkInputs = (type, id) => {
    const projInput = document.getElementById('newProjInput');
    const title = document.getElementById('title');

    projInput.classList.remove('missing');
    title.classList.remove('missing');

    if (projInput.classList.contains('showField') && projInput.value == '' || title.value == '') {
        if (projInput.classList.contains('showField') && projInput.value == '') {
            projInput.classList.add('missing');
        };
        if (title.value == '') {
            title.classList.add('missing');
        };
        return;
    };

    if (type == 'create') {
        createTask();
    } else {
        updateTask(id);
    };
};


export { checkInputs, showInputPopup, storeTasks }