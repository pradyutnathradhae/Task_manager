async function fetchallTasks() {
    const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    return await response.json();
}

// Function to fetch tasks and display them in respective groups
async function fetchTasks() {
    // Fetch the tasks asynchronously and await the result
    const tasks = await fetchallTasks();
    const todoTasks = tasks.filter(task => task.status === 'To Do');
    const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
    const completedTasks = tasks.filter(task => task.status === 'Completed');

    // Display tasks in respective groups
    populateTaskGroup('todoList', todoTasks, 'todo');
    populateTaskGroup('inProgressList', inProgressTasks, 'in-progress');
    populateTaskGroup('completedList', completedTasks, 'completed');

    // Show success message
    showMessage("Tasks fetched and grouped successfully!", 'green');

    // Render the charts with the task data
    renderCharts(todoTasks.length, inProgressTasks.length, completedTasks.length);
}

// Function to populate each task group
function populateTaskGroup(groupId, tasks, status) {
    const groupElement = document.getElementById(groupId);
    groupElement.innerHTML = ''; // Clear the current group

    if (tasks.length === 0) {
        groupElement.innerHTML = '<li>No tasks found in this category.</li>';
        return;
    }

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.title;
        listItem.classList.add(status); // Add class for color coding
        groupElement.appendChild(listItem);
    });
}

// Function to show messages
function showMessage(message, color) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = color;

    // Clear the message after a few seconds
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 3000);
}

// Function to render bar and pie charts
function renderCharts(todoCount, inProgressCount, completedCount) {
    // Bar Chart
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['ToDo', 'In Progress', 'Completed'],
            datasets: [{
                label: 'Task Count',
                data: [todoCount, inProgressCount, completedCount],
                backgroundColor: ['#f8d7da', '#fff3cd', '#d4edda'],
                borderColor: ['#f5c6cb', '#ffeeba', '#c3e6cb'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Pie Chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['ToDo', 'In Progress', 'Completed'],
            datasets: [{
                data: [todoCount, inProgressCount, completedCount],
                backgroundColor: ['#f8d7da', '#fff3cd', '#d4edda']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}