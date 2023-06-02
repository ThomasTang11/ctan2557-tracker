// Import the images
import cardioImage from './images/cardio.jpg';
import weightsImage from './images/weights.jpg';

// Setting up DOM elements
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

// Handle form submission, using input values to add new task
form.addEventListener("submit", function(event) {
  event.preventDefault();
  addTask(
    form.elements.taskName.value,
    form.elements.taskType.value,
    form.elements.taskTime.value,
    form.elements.taskIntensity.value,
    form.elements.taskFeedback.value
  );
});

// General function for fetching tasks from localStorage and rendering to screen
function displayTasks() {
  // Clear the tasklist <ul> element's content
  tasklist.innerHTML = "";

  // Fetch and parse tasks array from localStorage
  let localTasks = JSON.parse(localStorage.getItem("tasks"));

  // If there are tasks (localStorage item exists)
  if (localTasks !== null) {
    // Loop through all tasks in the array
    localTasks.forEach(function(task) {
      // Create new list item and populate with content (including data attribute for ID)
      let item = document.createElement("li");
      item.setAttribute("data-id", task.id);

      // Add image based on task type
      let imageSrc = "";
      if (task.type === "Cardio") {
        imageSrc = "cardio.jpg";
      } else if (task.type === "Weights") {
        imageSrc = "weights.jpg";
      }

      item.innerHTML = `<div class="task-content">
        <div class="task-info">
          <h3>${task.name}</h3>
          <p>Type: ${task.type}</p>
          <p>Time: ${task.time} minutes</p>
          <p>Intensity: ${task.intensity}</p>
          <p>User Feedback: ${task.feedback}</p>
          <p>Recorded on: ${task.date}</p>
        </div>
        <div class="task-image">
          <img src="${imageSrc}" alt="${task.type}">
        </div>
      </div>`;

      tasklist.appendChild(item);

      // Clear the value of the input once the task has been added to the page
      form.reset();

      // Setup delete button DOM elements
      let delButton = document.createElement("button");
      let delButtonText = document.createTextNode("Delete");
      delButton.appendChild(delButtonText);
      item.appendChild(delButton); // Adds a delete button to every task

      // Listen for when the delete button is clicked
      delButton.addEventListener("click", function(event) {
        // Loop through all the tasks to find the matching ID and remove it from the array
        localTasks.forEach(function(taskArrayElement, taskArrayIndex) {
          if (taskArrayElement.id == item.getAttribute("data-id")) {
            localTasks.splice(taskArrayIndex, 1);
          }
        });

        // Update localStorage with the newly spliced array (converted to a JSON string)
        localStorage.setItem("tasks", JSON.stringify(localTasks));

        item.remove(); // Remove the task item from the page when button clicked
        // Because we used 'let' to define the item, this will always delete the right element
      });
    });
  }
}

// Create a function called 'addTask'
// Give the function input parameters for: name, type, time, intensity, feedback
// Paste object definition from above in the function
// Replace the property values with the input parameters
// Add the object to the taskList array
function addTask(name, type, time, intensity, feedback) {
  // Creating the object, directly passing in the input parameters
  let task = {
    name,
    type,
    id: generateUniqueId(),
    date: new Date().toLocaleString(),
    time,
    intensity,
    feedback
  };

  // Fetch and parse tasks array from localStorage
  let localTasks = JSON.parse(localStorage.getItem("tasks"));

  // If no tasks exist in local storage, create a new array using the current task
  if (localTasks == null) {
    localTasks = [task];
  } else {
    // Otherwise check to see if a task with the same ID already exists (just in case)
    if (localTasks.find((element) => element.id === task.id)) {
      console.log("Task ID already exists");
    } else {
      // If not, push the new task to the array
      localTasks.push(task);
    }
  }

  // Update localStorage with the array (converted to a JSON string)
  localStorage.setItem("tasks", JSON.stringify(localTasks));

  // Call function to display the tasks on the DOM
  displayTasks();
}

// Generate a unique ID for each task
function generateUniqueId() {
  return Date.now().toString() + Math.floor(Math.random() * 100).toString();
}

// Call the function to display any existing tasks on page load
displayTasks();
