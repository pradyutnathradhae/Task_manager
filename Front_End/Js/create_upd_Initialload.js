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
        icon: type === 'success' ? '../resources/success-icon.png' : '../resources/error-icon.png', // Replace with actual icon paths
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
    const form = document.getElementById('form0');
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

async function findTaskByTitle() {
    const form = document.getElementById('form0');
    const titlesearch = form.elements[0].value;
    const response = await fetch('http://localhost:8080/api/tasks/title/'+encodeURIComponent(titlesearch),{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    );
    const tasks = await response.json();
    document.getElementById('tasks').innerHTML = tasks
        .sort((a, b) => a.priority - b.priority)  // Sort by priority (adjust based on your data type)
        .map(task => `
        <li class="task-item">
            <strong>${task.title}</strong> - <span class="task-status">${task.status}</span>
            <p>Unique ID : ${task.id}</p>
        </li>
    `)
        .join('');
}

async function updateTask() {
    const form = document.getElementById('form1');
    const id = form.elements[0].value;
    const title = form.elements[1].value;
    const description = form.elements[2].value;
    const status = form.elements[4].value;
    const priority = Number(form.elements[3].value);
    const task = { title, description, status,priority };
    await fetch('http://localhost:8080/api/tasks/'+encodeURIComponent(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    });

    showNotification('Task successfully Updated!', 'success');

    // Reset the form fields
    form.reset();
}