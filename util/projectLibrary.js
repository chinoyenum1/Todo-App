import { render } from "../util/render";

let library = JSON.parse(localStorage.getItem("library")) || [];
let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [
  { id: Date.now().toString(), tasks: [], title: "All Tasks" },
];
// allTasks.dataset.projectId = allTasks[0].id
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
  // localStorage.setItem('library.selectedProjectId', selectedProjectId);
}

function deleteProject() {
  library = library.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  save();
  render();
}

export {projectLibrary, setSelectedProjectId, setSelectedProject, save, deleteProject};
