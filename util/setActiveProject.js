import { save} from "../util/projectLibrary";
import { render } from "../util/render";
import { projectLibrary, setSelectedProjectId, setSelectedProject } from "../util/projectLibrary";



function setActiveProject(e) {
    const target = e.target.tagName.toLowerCase()
    if (target == 'div') {
        projectLibrary().selectedProjectId = setSelectedProjectId(e.target.dataset.projectId); 
        let currentProject = projectLibrary().library.find(project => project.id == projectLibrary().selectedProjectId) || projectLibrary().allTasks[0]
        projectLibrary().selectedProject = setSelectedProject(currentProject);
        save();
        render();
        
    }
}

export {setActiveProject}