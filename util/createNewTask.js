import { projectLibrary, save } from "../util/projectLibrary";
import { render } from "../util/render";
import { format } from "date-fns";

let taskTitle = document.querySelector('#task-title')
let taskDecription = document.querySelector('#desc')
let taskDueDate = document.querySelector('#task-date')
let taskPriority = document.querySelector('#priority')
let taskCompleted = document.querySelector('#completed')
const modal = document.querySelector('.modal')
const taskCreateForm = document.querySelector('#create-task')

//Form to input task details
function createNewTask() {
  modal.showModal();
  taskCreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.close("SUBMITTED");
  });
}

//Modal functionality
modal.addEventListener('close', (e)=>{
    e.preventDefault()
    if (modal.returnValue === 'SUBMITTED') {
        const task = {
            id: format(new Date(), 'T'),
            title: taskTitle.value,
            description: taskDecription.value,
            date: taskDueDate.value,
            priority: taskPriority.value,
            completed: taskCompleted.checked,
        }
        
        createTask(task)
    }
})

//Creating a task from modal input values
function createTask(task) {
    if(task.title == '' || task.date == null) return;
    projectLibrary().selectedProject.tasks.push(task)
    addProjectTaskTOAllTask()
    save()
    render()
}

//Requesting to edit task detail
export function editDeleteTask(e){
    let selectedTaskId = e.target.parentElement.parentElement.dataset.taskId

    if(projectLibrary().selectedProject == projectLibrary().allTasks[0]) {
        alert('cannot edit or delete from this file')
    }else if (e.target.parentElement.classList.contains('delete-task')) {
        deleteTaskFromList(selectedTaskId)
    }else if(e.target.parentElement.classList.contains('edit-task')) {
        editTask(selectedTaskId);
    }else if(e.target.parentElement.classList.contains('priority')){
        selectedTaskId = e.target.parentElement.parentElement.dataset.taskId
        setTaskComplete(selectedTaskId)
    }else{
        return
    }

}

//Removing task from list
function deleteTaskFromList(taskId) {
  projectLibrary().selectedProject.tasks = projectLibrary().selectedProject.tasks.filter((task) => task.id !== taskId);
  addProjectTaskTOAllTask();
  save();
  render();
}

//Editing task
function editTask(selectedTaskId) {
  let selectedtask = projectLibrary().selectedProject.tasks.filter((task) => task.id === selectedTaskId);
  deleteTaskFromList(selectedTaskId);
  
  taskTitle.value = selectedtask[0].title;
  taskDecription.value = selectedtask[0].description;
  taskDueDate.value = selectedtask[0].date;
  taskPriority.value = selectedtask[0].priority;
  taskCompleted.checked = selectedtask[0].completed;
  
  modal.showModal();
  taskCreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modal.close("SUBMITTED");
  });
  
}

//Add all task in the projects to all task folder
function addProjectTaskTOAllTask(){
    projectLibrary().allTasks[0].tasks.length = 0
    projectLibrary().library.forEach(project => {
        let projectTaskList = project.tasks;
        projectTaskList.forEach(task => {
            projectLibrary().allTasks[0].tasks.push(task)
        })
        save();
    })
    return projectLibrary().allTasks[0].tasks
}

//Modal closing functionality
function closeModal() {
    modal.close()
}

//Setting task complete 
function setTaskComplete(taskID) {
  projectLibrary().selectedProject.tasks.forEach((task) => {
    if (task.id == taskID) {
      task.completed == true ? (task.completed = false) : (task.completed = true);
      addProjectTaskTOAllTask();
      save();
      render();
    }
  });
}

export {createNewTask, addProjectTaskTOAllTask, closeModal}