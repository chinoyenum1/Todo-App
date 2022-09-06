import { projectLibrary } from "../util/projectLibrary";
// import { allTasks } from "../utils/project-library";

const projectList = document.querySelector(".project-list");




export function render() {
    clearElement(projectList)
    renderAllProjectTask();
    renderProject();

    console.log(projectLibrary().selectedProjectId);
    console.log(projectLibrary().selectedProject);
    // if(selectedProjectId == null){
    //     task_list.style.display = 'none'
    //     task_header.innerText = ``
    //     incomplete_task.innerText = ``
    // }else {
    //     task_list.style.display = ''
    //     task_header.innerText = selectedProject.title
    //     const number_of_tasks = selectedProject.tasks.length
    //     const incomplete = selectedProject.tasks.filter(task => task.completed == false)
    //     incomplete_task.innerText = `${incomplete.length} incomplete ${incomplete.length == 1 ? 'task' : 'tasks'}`
    //     completed_task.innerText = `${number_of_tasks - incomplete.length} incomplete ${number_of_tasks - incomplete.length == 1 ? 'task' : 'tasks'}`
    // }
    // clearElement(task_list)
    // renderTasks(selectedProject.tasks)
    
}

function clearElement(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild) 
    }
}

function renderAllProjectTask() {

    const taskBox = document.createElement('div')
    taskBox.classList.add('project')
    taskBox.dataset.projectId = projectLibrary().allTasks[0].id
    const h6 = document.createElement('h6')
    h6.textContent = `All Tasks`
    const p = document.createElement('p')
    // let totalTask = taskList.length
    // p.textContent = `${totalTask} ${totalTask == 1 ? 'task' : 'tasks'}`
    p.textContent = `5 tasks`
    
    taskBox.append(h6, p)
    if (projectLibrary().allTasks[0].id === projectLibrary().selectedProjectId) {
        taskBox.classList.add('active')
    }
    projectList.append(taskBox)
  
}

  export function renderProject() {
    projectLibrary().library.forEach(singleProject => {
        const project = document.createElement('div')
        project.classList.add('project')
        project.dataset.projectId = singleProject.id
        const h6 = document.createElement('h6')
        h6.textContent = `${singleProject.title}`
        const p = document.createElement('p')
        
        let taskRemain = singleProject.tasks.length
        p.textContent = `${taskRemain} ${taskRemain == 1 ? 'task' : 'tasks'}`
        
        project.append(h6, p)
        
        if (singleProject.id === projectLibrary().selectedProjectId) {
            project.classList.add('active')
          }

        projectList.append(project)
    })
}

