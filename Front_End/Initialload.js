async function fetchTasks() {
    const response = await fetch('http://localhost:8080/api/tasks',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
        }
    );
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
// Helper function to display a browser notification
function displayNotification(message, type) {
    const notificationOptions = {
        body: message,
        icon: type === 'success' ? 'resources/success-icon.png' : 'resources/error-icon.png', // Replace with actual icon paths
    };
    new Notification('Task Manager Notification', notificationOptions);
}
// Function to show a notification
function showNotification(message, type) {
    // Check if notifications are supported
    if (!("Notification" in window)) {
        alert(message);
        return;
    }

    // Request permission if not already granted
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                displayNotification(message, type);
            }
        });
    } else {
        displayNotification(message, type);
    }
}

async function addTask() {
    const form = document.getElementById('form');
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

    showNotification('Task successfully created!', 'success');

    // Reset the form fields
    form.reset();

}