
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

async function deleteTask() {
    const form = document.getElementById('form1');
    const id = form.elements[0].value;
    const response = await fetch('http://localhost:8080/api/tasks',{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    );
    const tasks = await response.json()
    if(tasks.filter(task => task.id === Number(id)).length === 0){
        showNotification('Error Check ID and connection! ', 'error');
    }
    else{
        await fetch('http://localhost:8080/api/tasks/'+encodeURIComponent(id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        showNotification('Task successfully Deleted!', 'success');
    }

    // Reset the form fields
    form.reset();
}