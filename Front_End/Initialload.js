async function fetchTasks() {
    const response = await fetch('http://localhost:8080/api/tasks');
    const tasks = await response.json();
    document.getElementById('tasks').innerHTML = tasks
        .filter(task => task.status.toLowerCase() !== 'completed')
        .sort((a, b) => a.priority - b.priority)  // Sort by priority (adjust based on your data type)
        .slice(0, 3)  // Take only the first 3 tasks after sorting
        .map(task => `
        <li class="task-item">
            <strong>${task.title}</strong> - <span class="task-status">${task.status}</span>
            <p>${task.description}</p>
        </li>
    `)
        .join('');
}

async function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;
    const priority = Number(document.getElementById('priority').value);
    const task = { title, description, status,priority };
    await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    fetchTasks(); // Refresh the task list
}
document.addEventListener('DOMContentLoaded', fetchTasks);