
const addtaskmenu = document.getElementById("addtaskmenu");
const promptMessage = document.getElementById('promptmessage')
const input = document.getElementById('addtaskinput');

const taskSection = document.getElementById('tasks');
const doneSection = document.getElementById('tasksdone');

const greenshade = 'hsl(120, 80%, 30%)';
const redshade = 'hsl(0, 80%, 50%)';

const good = 'bi bi-check2-circle';
const bad = 'bi bi-ban';

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
  
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskSection.innerHTML = '';
  doneSection.innerHTML = '';

  const tasks = getTasks();
  tasks.forEach(task => {
    const taskBox = document.createElement('li');
    taskBox.className = 'li';
    taskBox.id = task.id;

    const taskText = document.createElement('span');
    taskText.innerHTML = `&nbsp;${task.text}`;
    taskText.className = 'bi bi-check2-circle';

    const taskBtns = document.createElement('div');
    taskBtns.className = 'taskbtns';

    if (!task.done) {
      taskText.className = 'bi bi-dot';

      const doneBtn = document.createElement('button');
      doneBtn.className = 'bi bi-check2-circle button1';
      doneBtn.title = 'Mark as done';
      doneBtn.textContent = ' Done';
      doneBtn.onclick = () => markAsDone(task.id);
      taskBtns.appendChild(doneBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'bi bi-trash3 button2';
    deleteBtn.title = 'Delete';
    deleteBtn.onclick = () => delTask(task.id);
    taskBtns.appendChild(deleteBtn);

    taskBox.appendChild(taskText);
    taskBox.appendChild(taskBtns);

    if (task.done) {
      doneSection.appendChild(taskBox);
    } else {
      taskSection.appendChild(taskBox);
    }
  });
}

document.addEventListener('keypress', event => {
  if(addtaskmenu.checked){
    if(event.key === 'Enter'){
      addTask();
      addtaskmenu.checked = false;
    }
  }
})

function addTask() {
  const text = input.value.trim().charAt(0).toUpperCase() + input.value.trim().slice(1);

  const tasks = getTasks();
  const newTask = {
    id: 't' + Date.now(),
    text: text,
    done: false
  };

  if (!text){
    promptMessFunc(bad, ' Please enter a task!', redshade);
    addtaskmenu.checked = false;
  }
  else{
    tasks.push(newTask);
    saveTasks(tasks);
    input.value = '';
    renderTasks();
    promptMessFunc(good, ' Task Added!', greenshade);
  }
}

function delTask(taskId) {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
  renderTasks();
  promptMessFunc(good, ' Deleted!', greenshade);
}

function markAsDone(taskId) {
  const tasks = getTasks().map(task => {
    if (task.id === taskId) {
      task.done = true;
    }
    return task;
  });
  saveTasks(tasks);
  renderTasks();
  promptMessFunc(good, ' Marked as Done!', greenshade);
}

function clearAll() {
  const tasks = getTasks().filter(task => !task.done);
  saveTasks(tasks);
  renderTasks();
  promptMessFunc(good, ' Cleared!', greenshade);
}

function clearInput() {
  input.value = '';
}

function promptMessFunc(icon, message, color){
  promptMessage.className = icon;
  promptMessage.innerHTML = `&nbsp;${message}`;
  promptMessage.style.color = color;
  promptMessage.style.top = "5%";

  let displayMessage;
  clearTimeout(displayMessage);
  displayMessage = setTimeout(() => {
    promptMessage.style.top = "-110%"
  }, 3000)
}

document.addEventListener('DOMContentLoaded', renderTasks);