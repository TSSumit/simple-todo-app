let isNightMode = false;

let toggleNightMode = () => {
  isNightMode = !isNightMode;
  updateStyles();
  localStorage.setItem('nightMode', isNightMode);
};

let updateStyles = () => {
  let root = document.getElementById('html');

  if (isNightMode) {
    root.classList.add('night-mode');
  } else {
    root.classList.remove('night-mode');
  }
};

let applyNightModeFromLocalStorage = () => {
  let nightMode = localStorage.getItem('nightMode');
  isNightMode = nightMode === 'true';
  updateStyles();
};

document.getElementById('checkbox').addEventListener('change', function() {
    toggleNightMode();
});
window.addEventListener('load', applyNightModeFromLocalStorage);


let retrievedTask = localStorage.getItem('tasksArray');
let tasksArray = JSON.parse(retrievedTask);
let len=tasksArray.length;
let footer=document.getElementById('footer');
let taskcount=parseInt(localStorage.getItem('taskcount'));
// Check if the array is not present in local storage
if (!tasksArray) {
    tasksArray=[];
    len=0;
    localStorage.setItem("tasksArray",JSON.stringify(tasksArray));
    footer.hidden=true;
}

let addtask = () => {
    var inputValue = document.getElementById('inputtask').value.trim();
    if (inputValue!== '') {
        let newTask = createTaskAndDeleteBlock(inputValue);
        document.getElementById('tasks').appendChild(newTask);
        if(tasksArray.length==0){
            footer.hidden=false;
        }
        tasksArray.push(inputValue);
        localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
        len+=1;
        document.getElementById('taskdata').textContent=`You have ${len} pending tasks`;        
    } else {
        alert('Please enter a Task Information before adding.');
    }
};

let createTaskAndDeleteBlock = (inputValue) => {
    let cblock = document.createElement('div');
    cblock.className = 'taskanddelete';
    let ctask = document.createElement('li');
    ctask.className = 'task';
    ctask.textContent = inputValue;
    cblock.appendChild(ctask);
    let cdelete = document.createElement('img');
    cdelete.className = 'deleteimg';
    cdelete.src = 'delete.png';
    cdelete.addEventListener('click', (event) => {
        let parentTaskAndDelete = event.target.closest('.taskanddelete');
        if (parentTaskAndDelete) {
            parentTaskAndDelete.remove();
            // tasksArray.remove(inputValue);
            tasksArray = tasksArray.filter(item => item !== inputValue);
            localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
            len-=1;
            document.getElementById('taskdata').textContent=`You have ${len} pending tasks`;
            if(tasksArray.length==0){
                footer.hidden=true;
            }
        }
    });
    cblock.appendChild(cdelete);
    return cblock;
}
document.getElementById('addTask').addEventListener('click', addtask);
let deleteAll=()=>{
    if(confirm("do you won't to remove all tasks")){
        let ctasks=document.getElementById('tasks');
        ctasks.textContent = '';
        tasksArray=[];
        localStorage.setItem('tasksArray',JSON.stringify(tasksArray));
        len=0;
        document.getElementById('taskdata').textContent=`You have ${len} pending tasks`;
        footer.hidden=true;
    }
    
}
document.getElementById('clearbtn').addEventListener('click', deleteAll);
let loadTasksFromLocalStorage=()=>{
    let retrievedTask = localStorage.getItem('tasksArray');
    tasksArray = JSON.parse(retrievedTask || '[]');
    len=tasksArray.length;
    for (let task of tasksArray) {
        console.log(task);
        let newTask = createTaskAndDeleteBlock(task);
        document.getElementById('tasks').appendChild(newTask);
    }
    document.getElementById('taskdata').textContent=`You have ${len} pending tasks`;
}
window.addEventListener('load', loadTasksFromLocalStorage);

