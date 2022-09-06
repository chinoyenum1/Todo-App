import { projectLibrary, save } from "../util/projectLibrary";
// import { save } from "../utils/project-library";
import { render } from "../util/render";



const newProjectFormInput = document.querySelector(".new-project");


export function addNewProject(e) {
    e.preventDefault();
    let title = newProjectFormInput.value;
    if (title == "" || title == null) {
      return;
    }

    projectLibrary().library.push(createProject(title));
    save();
    render();

    // create_new_project_form.reset();
    newProjectFormInput.value = ``
}

function createProject(title) {
  return {
      id: Date.now().toString(),
      title: title,
      tasks: []    
  }
}