// import { projectFunctions } from './common';
// import { projUpdate } from './read';

// const addProjOption = () => {
//   const projects = projectFunctions.getProjects();
//   const options = document.getElementById('project');
//   const addOption = document.querySelector('option[value="newProject"');

//   while (options.querySelectorAll('option').length > 1) options.querySelector('option').remove();

//   projects.forEach((project, index) => {
//     const newOption = document.createElement('option');
//     newOption.setAttribute('value', `proj${index}`);
//     newOption.textContent = project;
//     options.insertBefore(newOption, addOption);
//   });
// };

// const checkProjSelection = () => {
//   if (document.getElementById('project').value === 'newProject') {
//     document.querySelector('label[for="project"]').classList.add('showField');
//     document.getElementById('newProjInput').classList.add('showField');
//     document.getElementById('newProjInput').focus();
//   } else {
//     document.querySelector('label[for="project"]').classList.remove('showField');
//     document.getElementById('newProjInput').classList.remove('showField');
//   }
// };

// const addProject = () => {
//   const newProj = document.createElement('li');
//   newProj.classList.add('projInput');
//   const newProjName = document.createElement('input');
//   const done = document.createElement('span');
//   done.textContent = '✔︎';
//   done.classList.add('done');

//   newProj.append(newProjName, done);
//   document.querySelector('.nav-proj+ul').append(newProj);
//   newProjName.focus();
// };

// const showAllProjects = () => {
//   const projects = projectFunctions.getProjects();
//   const list = document.querySelector('.nav-proj+ul');
//   list.innerHTML = '';

//   if (projects.length > 0) {
//     projects.forEach((project, index) => {
//       const newProjItem = document.createElement('li');
//       const projName = document.createElement('span');
//       projName.textContent = project;
//       newProjItem.setAttribute('id', `view-proj${index}`);
//       const trash = document.createElement('i');
//       trash.classList.add('fa', 'fa-solid', 'fa-trash');

//       newProjItem.append(projName, trash);
//       list.append(newProjItem);
//     });
//   }
// };

// const projUpdate = () => {
//   let latestView = document.querySelector('.current-view').id;

//   showAllProjects();
//   addProjOption();

//   if (!document.querySelector('.current-view')) latestView = 'view-all';
//   document.querySelector(`#${latestView} span`).click();
// };

// const createProject = (name) => {
//   const projects = projectFunctions.getProjects();
//   projectFunctions.setProjects([...projects, name]);

//   addProjOption();

//   if (document.querySelector('.projInput')) document.querySelector('.projInput').remove();
//   projUpdate();
// };

// export {
//   checkProjSelection,
//   createProject,
//   addProject,
//   addProjOption,
//   showAllProjects,
// };
