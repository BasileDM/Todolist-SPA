import { Task } from "./classes/Task";

setTimeout(() => {
    // new Task(1, "Task 1", "Description 1", "2022-01-01", 1, [1]);
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
            console.log(data);

            data.forEach((task) => {
                new Task(
                    task.ID,
                    task.TITLE,
                    task.DESCRIPTION,
                    task.DUE_DATE,
                    task.ID_PRIORITY,
                    task.CATEGORIES
                );
            });
            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}, 50);