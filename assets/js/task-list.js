import { Task } from "./classes/Task.js";

export function displayTaskList() {
    fetch("/src/getTasks.php", {
        method: "GET",
        headers: {
            "Content-Type": "x-www-form-urlencoded",
        },
    })
        .then((response) => {
            if (!response.ok || response.status !== 200) {
                throw new Error("Backend response was not ok.");
            } else {
                return response.json();
            }
        })
        .then((data) => {
            document.getElementById("taskContainer").innerHTML = "";
            if (data.length > 0) {
                data.forEach((task) => {
                    new Task(
                        task.TASK_ID,
                        task.TITLE,
                        task.DESCRIPTION,
                        task.DUE_DATE,
                        task.ID_PRIORITY,
                        task.CATEGORIES
                    );
                });
            } else {
                document.getElementById("taskContainer").innerHTML = "You have no tasks !";
            }
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}