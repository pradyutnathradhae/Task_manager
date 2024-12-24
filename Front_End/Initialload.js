async function fetchTasks() {
    const response = await fetch('http://localhost:8080/api/tasks');
    const tasks = await response.json();
    document.getElementById('tasks').innerHTML = tasks.map(task => `
                <li>
                    <strong>${task.title}</strong> - ${task.status}
                    <p>${task.description}</p>
                </li>
            `).join('');
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