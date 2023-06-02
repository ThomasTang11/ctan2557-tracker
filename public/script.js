const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask(
        form.elements.taskName.value,
        form.elements.taskType.value,
        form.elements.taskRate.value,
        form.elements.taskTime.value,
        form.elements.taskClient.value,
        form.elements.taskIntensity.value
    );
});

function displayTasks() {
    tasklist.innerHTML = "";
    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    if (localTasks !== null) {
        localTasks.forEach(function (task) {
            let item = document.createElement("li");
            item.setAttribute("data-id", task.id);
            item.innerHTML = `
                <div class="task-item">
                    <div class="task-details">
                        <p><strong>${task.name}</strong></p>
                        <p>Type: ${task.type}</p>
                        <p>Date: ${task.date}</p>
                        <p>Time: ${task.time}</p>
                        <p>Client: ${task.client}</p>
                        <p>Intensity: ${task.intensity}</p>
                    </div>
                </div>
            `;
            tasklist.appendChild(item);

            let delButton = document.createElement("button");
            let delButtonText = document.createTextNode("Delete");
            delButton.appendChild(delButtonText);
            item.appendChild(delButton);

            delButton.addEventListener("click", function (event) {
                let taskId = item.getAttribute('data-id');
                let updatedTasks = localTasks.filter(task => task.id !== taskId);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                item.remove();
            });
        });
    }
}

function addTask(name, type, rate, time, client, intensity) {
    let task = {
        name,
        type,
        id: Date.now(),
        date: new Date().toISOString(),
        rate,
        time,
        client,
        intensity
    };

    let localTasks = JSON.parse(localStorage.getItem('tasks'));
    if (localTasks == null) {
        localTasks = [task];
    } else {
        if (localTasks.find(element => element.id === task.id)) {
            console.log('Task ID already exists');
        } else {
            localTasks.push(task);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(localTasks));
    displayTasks();
}

displayTasks();
