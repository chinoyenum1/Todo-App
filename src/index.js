import "./index.html";
import './style.css';
import { render } from "../util/render";
import { addNewProject } from "../util/addNewProject";
import { setActiveProject } from "../util/setActiveProject";
import { deleteProject } from "../util/projectLibrary";
import { createNewTask, closeModal, editDeleteTask } from "../util/createNewTask";


window.addEventListener('load', () => {
    const createNewProjectForm = document.querySelector("#form-project");
    const projectList = document.querySelector(".project-list");
    const deleteProjectFromList = document.querySelector(".delete-project");
    const createTaskBtn = document.querySelector('.create')
    const modalClose = document.querySelector('.close-btn')
    const taskList = document.querySelector(".task-list");

    createNewProjectForm.addEventListener("submit", addNewProject);
    projectList.addEventListener("click", setActiveProject);
    deleteProjectFromList.addEventListener("click", deleteProject);
    createTaskBtn.addEventListener('click', createNewTask)
    modalClose.addEventListener('click', closeModal)
    taskList.addEventListener('click', editDeleteTask)



    render();
})
