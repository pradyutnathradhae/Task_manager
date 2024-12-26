const baseUrl = 'http://localhost:8080/api/tasks';

// Function to fetch all tasks
function fetchAllTasks() {
    fetch(`${baseUrl}`)
        .then(response => response.json())
        .then(data => populateTaskTable(data))
        .catch(error => showMessage(`Error fetching tasks: ${error}`, 'red'));
}
function filterTasks() {
    const data = fetch(`${baseUrl}`)
        .then(response => response.json())
    const status = String(document.getElementById('status').value);
    const priority = Number(document.getElementById('priority').value);
    if(priority <= 0 && status === "all"){
        fetchAllTasks()
    }
    else if(priority <= 0 && !(status === "all")){
        filterTasksByStatus()
    }
    else if(priority > 0 && status ==="all"){
        filterTasksByPriority()
    }
    else{
        filterTasksByStatusAndPriority();
    }
}
// Function to filter tasks by status
function filterTasksByStatus() {
    const status = document.getElementById('status').value;
    const url = `${baseUrl}/status/${status}`;
    fetch(url)
        .then(response => response.json())
        .then(data => populateTaskTable(data))
        .catch(error => showMessage(`Error fetching tasks: ${error}`, 'red'));
}

// Function to filter tasks by priority
function filterTasksByPriority() {
    const priority = document.getElementById('priority').value;
    const url = `${baseUrl}/priority/${priority}`;
    fetch(url)
        .then(response => response.json())
        .then(data => populateTaskTable(data))
        .catch(error => showMessage(`Error fetching tasks: ${error}`, 'red'));
}
// Function to filter tasks by status
function filterTasksByStatusAndPriority() {
    const status = document.getElementById('status').value;
    const priority = document.getElementById('priority').value;
    const url = `${baseUrl}/status/${status}/priority/${priority}`;
    fetch(url)
        .then(response => response.json())
        .then(data => populateTaskTable(data))
        .catch(error => showMessage(`Error fetching tasks: ${error}`, 'red'));
}
// Function to populate the task table
function populateTaskTable(tasks) {
    const tableBody = document.getElementById('taskTable');
    tableBody.innerHTML = ''; // Clear the table first

    if (tasks.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No tasks found</td></tr>';
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${task.id}</td>
          <td>${task.title}</td>
          <td>${task.status}</td>
          <td>${task.priority}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to show a message
function showMessage(message, color = 'green') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = color;

    // Clear the message after a few seconds
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}

// Fetch all tasks on page load
window.onload = fetchAllTasks;