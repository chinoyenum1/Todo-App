import { projectLibrary, save } from "../util/projectLibrary";
import { render } from "../util/render";
import { format} from "date-fns";

const newProjectFormInput = document.querySelector(".new-project");


function addNewProject(e) {
    e.preventDefault();
    let title = newProjectFormInput.value;
    if (title == "" || title == null) {
      return;
    }

    projectLibrary().library.push(createProject(title));
    save();
    render();

    newProjectFormInput.value = ``
}

function createProject(title) {
  return {
      id: format(new Date(), 'T'),
      title: title,
      tasks: []    
  }
}

export {addNewProject}