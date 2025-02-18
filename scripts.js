<script src="scripts.js"></script>
let tasks = [];
const newTaskInput = document.querySelector('#new-task');  
const addTaskBtn = document.querySelector('#add-task-btn');  
const taskList = document.querySelector('#task-list');  
const hideCompletedBtn = document.querySelector('#hide-completed');  

function addTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
  
    // Create the checkbox for marking as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.complete;
    checkbox.classList.add('complete-checkbox');
  
    // Create the task name
    const taskName = document.createElement('span');
    taskName.textContent = task.name;
    if (task.complete) {
      taskName.classList.add('completed');
    }
  
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
  
    // Create prioritize button
    const priorityBtn = document.createElement('button');
    priorityBtn.textContent = task.priority ? 'Unprioritize' : 'Prioritize';
    priorityBtn.classList.add('priority-btn');
  
    // Append elements to the task item
    taskItem.append(checkbox, taskName, priorityBtn, deleteBtn);
  
    // Add event listeners to the elements
    checkbox.addEventListener('click', () => toggleComplete(task));
    deleteBtn.addEventListener('click', () => deleteTask(task));
    priorityBtn.addEventListener('click', () => togglePriority(task));
  
    taskList.appendChild(taskItem);
  }
  
  function addTaskBtnClicked() {
    const newTaskName = newTaskInput.value.trim();
  
    if (!newTaskName) return; // Don't do anything if the input is empty
  
    const newTask = {
      name: newTaskName,
      complete: false,
      priority: false
    };
  
    tasks.push(newTask);  // Add task to the array
    addTaskElement(newTask);  // Add task to the DOM
  
    newTaskInput.value = '';  // Clear the input field
  }

  addTaskBtn.addEventListener('click', addTaskBtnClicked);
  newTaskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTaskBtnClicked();
    }
  });

  function reorderTasks() {
    tasks.sort((a, b) => b.priority - a.priority);  // Sort tasks by priority
  
    taskList.innerHTML = '';  // Clear the task list
  
    tasks.forEach((task) => {
      addTaskElement(task);  // Re-add tasks in sorted order
    });
  }

  function toggleComplete(task) {
    task.complete = !task.complete;  // Toggle the task completion status
  
    // Update the task list to reflect the changes
    reorderTasks();
  }

  function togglePriority(task) {
    task.priority = !task.priority;  // Toggle the task priority
    reorderTasks();  // Reorder tasks based on the new priority
  }

  function toggleHideCompleted() {
    taskList.classList.toggle('hide-completed');
  }

  .hide-completed .completed {
    display: none;
  }
  hideCompletedBtn.addEventListener('click', toggleHideCompleted);
