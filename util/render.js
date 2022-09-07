import { projectLibrary } from "../util/projectLibrary";
import { format, getDate, getMonth, getYear, milliseconds, getTime } from "date-fns";


const projectList = document.querySelector(".project-list");
const taskList = document.querySelector(".task-list");
const taskHeader = document.querySelector(".project-header");
const completedTask = document.querySelector(".completed");
const incompleteTask = document.querySelector(".incomplete");
const taskTemplate = document.querySelector(".task-template")


export function render() {
    clearElement(projectList)
    renderAllProjectTask();
    renderProject();

    let selectedProjectId = projectLibrary().selectedProjectId;
    let selectedProject = projectLibrary().selectedProject;
    if(selectedProjectId == null){
        const totalNumberOfTasks = projectLibrary().allTasks[0].tasks.length
        const totalIncomplete = projectLibrary().allTasks[0].tasks.filter(task => task.completed == false)
        taskHeader.innerText = `${projectLibrary().allTasks[0].title}`
        incompleteTask.innerText = `${totalIncomplete.length} incomplete ${totalIncomplete.length == 1 ? 'task' : 'tasks'}`
        completedTask.innerText = `${totalNumberOfTasks - totalIncomplete.length} incomplete ${totalNumberOfTasks - totalIncomplete.length == 1 ? 'task' : 'tasks'}`
    }else {
        taskList.style.display = ''
        taskHeader.innerText = selectedProject.title
        const numberOfTasks = selectedProject.tasks.length
        const incomplete = selectedProject.tasks.filter(task => task.completed == false)
        incompleteTask.innerText = `${incomplete.length} Incomplete ${incomplete.length == 1 ? 'task' : 'tasks'}`
        completedTask.innerText = `${numberOfTasks - incomplete.length} Completed ${numberOfTasks - incomplete.length == 1 ? 'task' : 'tasks'}`
    }
    clearElement(taskList)
    renderTasks(selectedProject.tasks)
    
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
    p.classList.add('task-count')
    let totalTask = projectLibrary().allTasks[0].tasks.length
    p.innerHTML = `${totalTask} ${totalTask == 1 ? 'task' : 'tasks'} <span class="material-symbols-sharp">
    list_alt</span>`

    
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


function renderTasks(elements) {
    elements.forEach((element) => {
      const taskElement = document.importNode(taskTemplate.content, true);
      const task = taskElement.querySelector('.task'); 
      const button = taskElement.querySelector(".priority");
      const date = taskElement.querySelector(".date");
      const title = taskElement.querySelector(".task-title");
      const edit_btn = taskElement.querySelector(".edit-task");
      const delete_btn = taskElement.querySelector(".delete-task");
      const taskDiv = taskElement.querySelector(".task");
  
      const priority = element.priority;
      let taskcomplete = element.completed
      if (taskcomplete) {
            button.innerHTML = `<span class="material-symbols-outlined ${priority}">check_box</span>`;
        } else {
          button.innerHTML = `<span class="material-symbols-outlined ${priority}">check_box_outline_blank</span>`;
        }
     
      let duedate = new Date(element.date);
      const day = format(duedate, 'dd');
      const month = format(duedate, 'MMMM');
      const year = format(duedate, 'yyyy');
      date.innerHTML = `<div>
                            <span class="month">${month}</span>
                            <span class="day">${day}</span>
                            <span class="year">${year}</span>
                        </div>`;
      date.classList.add("duedate");
      edit_btn.innerHTML = `<span class="material-symbols-rounded">
      edit_square
      </span>`;
      delete_btn.innerHTML = `<span class="material-symbols-rounded">
      delete_forever
      </span>`;
      title.textContent = element.title;
      taskDiv.dataset.taskId = element.id
      if (element.completed === true) {
          taskDiv.classList.add('complete')
      }
          
      taskList.appendChild(taskElement);
    });
  
    
  }
