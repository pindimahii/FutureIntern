// script.js
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
      alert('Please enter a task');
      return;
    }
    
    const taskItem = createTaskItem(taskText, false);
    document.getElementById('pending-tasks').appendChild(taskItem);
    
    taskInput.value = '';
  }
  
  function createTaskItem(taskText, isCompleted) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
  
    const completeButton = document.createElement('button');
    completeButton.textContent = isCompleted ? 'Undo' : 'Complete';
    completeButton.onclick = () => toggleTaskCompletion(taskItem, taskText, isCompleted);
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';
    editButton.onclick = () => editTask(taskItem);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = () => deleteTask(taskItem);
  
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
  
    return taskItem;
  }
  
  function toggleTaskCompletion(taskItem, taskText, isCompleted) {
    const newTaskItem = createTaskItem(taskText, !isCompleted);
    
    if (isCompleted) {
      document.getElementById('completed-tasks').removeChild(taskItem);
      document.getElementById('pending-tasks').appendChild(newTaskItem);
    } else {
      document.getElementById('pending-tasks').removeChild(taskItem);
      document.getElementById('completed-tasks').appendChild(newTaskItem);
    }
  }
  
  function editTask(taskItem) {
    const taskText = prompt('Edit task:', taskItem.firstChild.textContent);
    if (taskText === null || taskText.trim() === '') {
      return;
    }
    
    taskItem.firstChild.textContent = taskText;
  }
  
  function deleteTask(taskItem) {
    const taskList = taskItem.parentNode;
    taskList.removeChild(taskItem);
  }
  