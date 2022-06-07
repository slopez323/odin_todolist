import { projUpdate, changeView } from "./read";
import { deleteProject } from "./delete";

const projects = JSON.parse(localStorage.getItem('projList')) || [];

const storeProjects = () => {
    localStorage.setItem('projList', JSON.stringify(projects));
};

const addProjOption = () => {
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

const addProjListeners = () => {
    document.querySelectorAll('.nav-proj span').forEach(item => {
        item.removeEventListener('click', changeView);
    });
    document.querySelectorAll('.sidebar .fa-trash').forEach(item => {
        item.removeEventListener('click', deleteProject);
    });

    document.querySelectorAll('.nav-proj+ul span').forEach(item => {
        item.addEventListener('click', () => changeView(item.parentNode));
    });
    document.querySelectorAll('.sidebar .fa-trash').forEach(item => {
        item.addEventListener('click', () => deleteProject(item.parentNode));
    });
};

const createProject = (name) => {
    projects.push(name);
    addProjOption();
    storeProjects();

    if (document.querySelector('.projInput')) document.querySelector('.projInput').remove();
    projUpdate();
};

const checkProjSelection = () => {
    if (document.getElementById('project').value == 'newProject') {
        document.querySelector('label[for="project"]').classList.add('showField');
        document.getElementById('newProjInput').classList.add('showField');
        document.getElementById('newProjInput').focus();
    } else {
        document.querySelector('label[for="project"]').classList.remove('showField');
        document.getElementById('newProjInput').classList.remove('showField');
    };
};

const addProject = () => {
    const newProj = document.createElement('li');
    newProj.classList.add('projInput')
    const newProjName = document.createElement('input');
    const done = document.createElement('span');
    done.textContent = '✔︎';
    done.classList.add('done');

    newProj.append(newProjName, done);
    document.querySelector('.nav-proj+ul').append(newProj);
    newProjName.focus();

    done.addEventListener('click', () => {
        if(newProjName.value != '') createProject(newProjName.value);
    });
    newProjName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newProjName.value != '') createProject(newProjName.value);
    });
};

export { projects, checkProjSelection, createProject, addProject, addProjOption, addProjListeners, storeProjects };