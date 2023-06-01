import images from './images/thumbnails/*.gif';
console.log(images)

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
    )
})


function displayTasks() {

    tasklist.innerHTML = ""
    let localTasks = JSON.parse(localStorage.getItem('tasks'))
    if (localTasks !== null) {
        localTasks.forEach(function (task) {

            let taskImage = null;
            switch (task.type) {
                case 'Concept Ideation':
                    taskImage = images['ideate']
                    break;
                case 'Wireframing':
                    taskImage = images['design']
                    break;
                case 'Application Coding':
                    taskImage = images['code']
                    break;
                default:
                    break;
            }

            let item = document.createElement("li");
            item.setAttribute("data-id", task.id);
            item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p><img src='${taskImage}' width='50'/>`;
            tasklist.appendChild(item);


            form.reset();


            let delButton = document.createElement("button");
            let delButtonText = document.createTextNode("Delete");
            delButton.appendChild(delButtonText);
            item.appendChild(delButton); 

            delButton.addEventListener("click", function (event) {


                localTasks.forEach(function (taskArrayElement, taskArrayIndex) {
                    if (taskArrayElement.id == item.getAttribute('data-id')) {
                        localTasks.splice(taskArrayIndex, 1)
                    }
                })


                localStorage.setItem('tasks', JSON.stringify(localTasks))

                item.remove(); 

            })
        })

    }

}




function addTask(name, type, rate, time, client) {


    let task = {
        name,
        type,
        id: Date.now(),
        date: new Date().toISOString(),
        rate,
        time,
        client
    }


    let localTasks = JSON.parse(localStorage.getItem('tasks'))


    if (localTasks == null) {
        localTasks = [task]
    } else {
        if (localTasks.find(element => element.id === task.id)) {
            console.log('Task ID already exists')
        } else {

            localTasks.push(task);
        }
    }


    localStorage.setItem('tasks', JSON.stringify(localTasks))


    displayTasks();

}


addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");