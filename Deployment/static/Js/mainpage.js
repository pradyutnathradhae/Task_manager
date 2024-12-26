async function fetchallTasks() {
    const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    return await response.json();
}
function sendEmail() {
    const email = "pradyutvam@protonmail.com";
    const subject = "Hello!";
    const body = "This is a test email.";

    // Construct the mailto URL
    // Open the mailto link
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(","); // Get headers from the first object
    const rows = data.map(row =>
        Object.values(row)
            .map(value =>
                `"${String(value).replace(/"/g, '""')}"`
            )
            .join(",")
    ); // Map each object to a CSV row with proper escaping
    return [headers, ...rows].join("\n");
}
async function downloadCSV() {
    const tasks = await fetchallTasks();
    const csvContent = convertToCSV(tasks);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.csv";
    a.click();

    URL.revokeObjectURL(url); // Clean up URL
}