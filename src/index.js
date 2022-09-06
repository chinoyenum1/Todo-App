import "./index.html";
import './style.css';
import { render } from "../util/render";
import { addNewProject } from "../util/addNewProject";
import { setActiveProject } from "../util/setActiveProject";
import { deleteProject } from "../util/projectLibrary";


window.addEventListener('load', () => {
    const createNewProjectForm = document.querySelector("#form-project");
    const projectList = document.querySelector(".project-list");
    const deleteProjectFromList = document.querySelector(".delete-project");



    createNewProjectForm.addEventListener("submit", addNewProject);
    projectList.addEventListener("click", setActiveProject);
    deleteProjectFromList.addEventListener("click", deleteProject);



    render();
})

