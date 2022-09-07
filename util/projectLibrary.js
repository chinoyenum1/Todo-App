import { render } from "../util/render";
import { addProjectTaskTOAllTask } from "../util/createNewTask";
import { format } from "date-fns";


let library = JSON.parse(localStorage.getItem("library")) || [];
let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [
  { id: format(new Date(), 'T'), tasks: [], title: "All Tasks" },
];
let selectedProject = allTasks[0];
let selectedProjectId = allTasks[0].id;

function projectLibrary() {
  return { library, selectedProject, selectedProjectId, allTasks };
}

function setSelectedProjectId(value) {
  selectedProjectId = value;
}

function setSelectedProject(value){
  selectedProject = value;
}

function save() {
  localStorage.setItem("library", JSON.stringify(projectLibrary().library));
  localStorage.setItem("allTasks", JSON.stringify(projectLibrary().allTasks));
}

function deleteProject() {
  library = library.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = allTasks[0].id;
  addProjectTaskTOAllTask();
  save();
  render();
}

export {projectLibrary, setSelectedProjectId, setSelectedProject, save, deleteProject};
