import { displaySignupError } from "./display";
import { displayTaskList } from "./taskList";
let taskCategories = [];

export function fetchCategories() {
    taskCategories = [];
    fetch("./../src/getCategories.php", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Categories not found.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            const categoriesElement = document.querySelector("#taskCategory");
            categoriesElement.innerHTML = "";
            data.forEach(category => {
                const inputId = `btn-check-${category.ID}`;
                const labelFor = `btn-check-${category.ID}`;
                const input = `<input type="checkbox" class="btn-check" id="${inputId}" autocomplete="off">`;
                const label = `<label class="btn" for="${labelFor}">${category.NAME}</label>`;
                categoriesElement.insertAdjacentHTML("beforeend", input);
                categoriesElement.insertAdjacentHTML("beforeend", label);

                const inputElement = document.querySelector(`#${inputId}`);

                inputElement.addEventListener("change", function () {
                    if (inputElement.checked) {
                        taskCategories.push(category.ID);
                        console.log(taskCategories);
                    } else {
                        const index = taskCategories.indexOf(category.ID);
                        if (index > -1) {
                            taskCategories.splice(index, 1);
                            console.log(taskCategories);
                        }
                    }
                });
            });
        })
}

function checkTaskForm () {
    const title = document.querySelector("#taskTitle").value;
    const description = document.querySelector("#taskDescription").value;
    const dueDate = document.querySelector("#taskDueDate").value;
    const priority = document.querySelector("#taskPriority").value;

    if (title.length < 3 || title.length > 50) {
        displaySignupError("Title must be between 3 and 50 characters long.", "taskTitle");
        return false;
    }

    if (description.length < 3 || description.length > 50) {
        displaySignupError("Description must be between 3 and 50 characters long.", "taskDescription");
        return false;
    }

    return true;
}

export function addTask() {
    if(!checkTaskForm()) {
        return;
    } else {
        fetch("/src/addTask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: document.querySelector("#taskTitle").value,
                description: document.querySelector("#taskDescription").value,
                dueDate: document.querySelector("#taskDueDate").value,
                priority: document.querySelector("#taskPriority").value,
                categories: taskCategories
            }),
        })
            .then((response) => {
                if (!response.ok || response.status !== 200) {
                    throw new Error("Backend response was not ok.");
                } else {
                    return response.text();
                }
            })
            .then((data) => {
                console.log(`Result of adding task : ${data}`);
                displayTaskList();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}

window.onload = function () {
    taskCategories = [];
}
