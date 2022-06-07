import './style.css';
import { checkInputs, showInputPopup } from './create';
import { startup, changeView } from './read';
import { checkProjSelection, addProject } from './projects';
import { standardDateFormat } from './dates';

startup();

const dateToday = (() => {
    const today = standardDateFormat([new Date().getMonth() + 1, new Date().getDate(), new Date().getFullYear()]);
    document.querySelector('.today').textContent = today;
})();

const addListeners = (() => {
    document.querySelectorAll('.nav-all+ul>li').forEach(item => {
        item.addEventListener('click', () => changeView(item));
    });

    document.querySelectorAll('.newTask').forEach(item => {
        item.addEventListener('click', showInputPopup);
    });

    document.querySelector('.addProject').addEventListener('click', addProject);

    document.querySelector('.popup button').addEventListener('click', () => {
        checkInputs('create');
    });

    document.getElementById('edit').addEventListener('click', () => {
        const id = document.getElementById('edit').getAttribute('data-id');
        checkInputs('edit', id);
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-container')) {
            document.querySelector('.popup-container').style.display = 'none';
        };
        if (!e.target.classList.contains('done') && !e.target.classList.contains('addProject')) {
            if (document.querySelector('.projInput')) document.querySelector('.projInput').remove();
        };
    });

    document.getElementById('project').addEventListener('change', checkProjSelection);

    document.querySelectorAll('main select').forEach(item => {
        item.addEventListener('change', () => changeView(document.querySelector('.current-view')));
    });
})();